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
    var u = new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const GARDEN_BASE_PATH = "musings";

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

const parsePregnantParagraph = (contentObject: any, index: number) => {
  const link = contentObject?.href;

  if (link) {
    return isExternal(link)
      ? h("a", { href: link })
      : h("a", { herf: `/${GARDEN_BASE_PATH}${link}` });
  }
};

const parseParagraph = (elementObject: Content, index: number) => {
  if (!paragraphHasChildren(elementObject)) {
    return h("p", getParagraphContent(elementObject));
  } else {
    const paragraphArray = getParagraphArray(elementObject);
    const paragraphDescendants = Map(parsePregnantParagraph, paragraphArray);
    return h("p", paragraphDescendants);
  }
};

function renderProcedure(elementObject: Content | any, index: number): any {
  const elementType: ContentType = getElementType(elementObject);
  switch (elementType) {
    case "paragraph":
      return parseParagraph(elementObject, index);
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
    default:
      return "";
  }
}

export default {
  props: ["postContent"],
  setup(props) {
    return h("div", Map(renderProcedure, props.postContent));
  },
};
