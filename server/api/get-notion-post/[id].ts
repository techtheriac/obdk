import { getPostContent, getPostBySlug } from "../../utils/notion";

export default defineEventHandler(async (event) => {
  const params = event.context.params;

  if (!params?.id) {
    return;
  }

  const postData = await getPostBySlug(params.id);
  const postContent = await getPostContent(postData.results[0].id);

  return {
    postData: postData.results[0],
    postContent,
  };
});
