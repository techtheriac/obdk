import axios from "axios";
import { type BlocksConfig } from "~/obdk";

export class Blocks {
  readonly config: BlocksConfig;
  constructor(config: BlocksConfig) {
    this.config = config;
  }

  async getChannels(): Promise<any> {
    const { baseUrl, token } = this.config;

    const response = await axios.get(
      `${baseUrl}/users/jezreel-franklin/channels`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // return response.data;

    return response.data.channels
      .filter((x) => x.published)
      .map((x) => {
        return {
          slug: x.slug,
          title: x.title,
          preview: x.contents[0]?.image?.square?.url,
        };
      });
  }
}
