// @ts-nocheck
import { getPost } from "../../utils/notion";

export default defineEventHandler(async (event) => {
  const params = event.context.params;

  if (!params?.id) {
    return;
  }

  const postData = await getPost(params.id);
  return {
    slug: postData.properties.slug.rich_text[0].plain_text,
  };
});
