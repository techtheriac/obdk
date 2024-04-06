import { type BlocksConfig } from "~/obdk";
import { Blocks } from "../utils/arena";

const config: BlocksConfig = {
  token: process.env.ARENA_ACCESS_TOKEN!,
  baseUrl: process.env.ARENA_BASE!,
};

export default defineEventHandler(async (event) => {
  const BLOCKS_INSTANCE = new Blocks(config);
  const res = await BLOCKS_INSTANCE.getChannels();
  return res;
});
