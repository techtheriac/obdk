import compact from "./funcUtils";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_TOKEN,
});

export const getPosts = async () => {
  return await notion.databases.query({
    database_id: process.env.NOTION_BLOG_ID!,
    filter: {
      property: "active",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
  });
};

export const getPost = async (id: string) => {
  const properties = await notion.pages.properties.retrieve({
    page_id: id,
    property_id: "aBAN",
  });

  // console.log("PROPERTIES", properties.results[0]);

  return await notion.pages.retrieve({ page_id: id });
};

export const getPostContent = async (id: string) => {
  const baseQuery = {
    block_id: id,
    page_size: 100,
  };

  let results: unknown[] = [];
  let postContent = await notion.blocks.children.list(baseQuery);
  results = [...postContent.results];

  while (postContent.has_more) {
    postContent = await notion.blocks.children.list({
      ...baseQuery,
      start_cursor: postContent.next_cursor!,
    });
    results = [...results, ...postContent.results];
  }
  return results;
};
