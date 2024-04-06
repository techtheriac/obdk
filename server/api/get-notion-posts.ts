import { getPosts } from "../utils/notion";

export default defineEventHandler(async () => {
  return await getPosts();
});
