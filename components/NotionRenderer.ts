import * as R from "ramda";
import type { Content, ContentType } from "~/obdk";
import { h } from "vue";

function viewPathContent(
  path: R.Lens<any, any>,
  elementobject: any,
): any[] | string | any {
  return R.view(path, elementobject);
}

const Map = R.addIndex(R.map);

const isExternal = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (error) {
    return false;
  }
};

const GARDEN_BASE_PATH = "notes";
const ELEMENT_TYPE_PATH = R.lensPath(["type"]);

const PARAGRAPH_CONTENT_PATH = R.lensPath([
  "paragraph",
  "text",
  0,
  "plain_text",
]);

const BULLET_LIST_ITEM_PATH = R.lensPath([
  "bulleted_list_item",
  "text",
  0,
  "plain_text",
]);

const QUOTE_CONTENT_PATH = R.lensPath(["quote", "text", 0, "plain_text"]);
const CODE_ITEM_PATH = R.lensPath(["code", "text", 0, "plain_text"]);
const PARAGRAPH_PATH = R.lensPath(["paragraph", "text"]);

const HEADING_CONTENT_PATH = (level: number) =>
  R.lensPath([`heading_${level}`, "text", 0, "plain_text"]);

const getContent = (path) => (elementObject) =>
  viewPathContent(path, elementObject);

const elementHasChildren = (path) => (elementObject) =>
  R.length(viewPathContent(path, elementObject)) > 1;

const getParagraphContent = getContent(PARAGRAPH_CONTENT_PATH);
const getParagraphArray = getContent(PARAGRAPH_PATH);
const getElementType = getContent(ELEMENT_TYPE_PATH);
const paragraphHasChildren = elementHasChildren(PARAGRAPH_PATH);

async function handleTextNode(contentObject: any, index: number) {
  const link = contentObject?.href;

  if (!link) {
    return contentObject?.plain_text;
  }

  if (isExternal(link)) {
    return h("a", { href: link }, contentObject?.plain_text);
  }

  const slug = await getSlugFromPageId(link);

  return h(
    "a",
    { href: `/${GARDEN_BASE_PATH}/${slug}` },
    contentObject?.plain_text,
  );
}

async function getSlugFromPageId(pageId: string): Promise<string | undefined> {
  const { data } = await useFetch(`/api/get-notion-slug-by-id${pageId}`);

  if (data) {
    // @ts-ignore
    return data.value.slug as string;
  }
}

const parseParagraph = async (elementObject: Content, index: number) => {
  if (!paragraphHasChildren(elementObject)) {
    return h("p", getParagraphContent(elementObject));
  } else {
    const paragraphArray = getParagraphArray(elementObject);

    const paragraphDescendants = await Promise.all(
      paragraphArray.map(renderProcedure),
    );
    // const _paragraphDescendants = Map(renderProcedure, paragraphArray);
    return h("p", paragraphDescendants);
  }
};

async function renderProcedure(
  elementObject: Content | any,
  index: number,
): Promise<any> {
  const elementType: ContentType = getElementType(elementObject);
  switch (elementType) {
    case "paragraph":
      return await parseParagraph(elementObject, index);
    case "heading_1":
      return h("h1", getContent(HEADING_CONTENT_PATH(1))(elementObject));
    case "heading_2":
      return h("h2", getContent(HEADING_CONTENT_PATH(2))(elementObject));
    case "heading_3":
      return h("h3", getContent(HEADING_CONTENT_PATH(3))(elementObject));
    case "heading_4":
      return h("h4", getContent(HEADING_CONTENT_PATH(4))(elementObject));
    case "heading_5":
      return h("h5", getContent(HEADING_CONTENT_PATH(5))(elementObject));
    case "heading_6":
      return h("h6", getContent(HEADING_CONTENT_PATH(6))(elementObject));
    case "bulleted_list_item":
      return h("li", getContent(BULLET_LIST_ITEM_PATH)(elementObject));
    case "code":
      return h("code", getContent(CODE_ITEM_PATH)(elementObject));
    case "quote":
      return h("blockquote", [
        h("p", getContent(QUOTE_CONTENT_PATH)(elementObject)),
      ]);
    case "text":
      return await handleTextNode(elementObject, index);
    default:
      return "";
  }
}

export default {
  props: ["postContent"],
  async setup(props) {
    const content = await Promise.all(props.postContent.map(renderProcedure));
    // return () => h("div", Map(renderProcedure, props.postContent));
    return () => h("div", content);
  },
};
