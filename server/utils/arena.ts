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
      `${baseUrl}/channels/readings-to-live-by/thumb`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // return response.data;

    return response.data.contents.map((x) => {
      return {
        image: x.image?.square?.url,
        source: x.source?.url,
        title: x?.title,
      };
    });
  }
}
