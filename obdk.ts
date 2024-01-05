import { Application } from "./utils/application";

export type AudioContextState = "running" | "suspended" | "initial" | "closed";

export type NavigationOption = "Folder" | "File";
export type NavigationItemOption = {
  name: String;
  type: NavigationOption;
  path: string;
};

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export type SpotifyImage = {
  height: number;
  width: number;
  url: string;
};

export type NowPlaying = {
  artist: string;
  songTitle: string;
  url: string;
  previewUrl: string;
  images: SpotifyImage[];
};

export type Url = `https://${string}`;

export type SpotifyConfig = {
  authBase?: Url | string;
  base?: Url | string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
};

export interface MusicIntegration {
  ConfigOptions: SpotifyConfig;
  extractColorPaletteFromImage(source: Url): Promise<any>;
  getAccessToken(): Promise<AccessTokenResponse>;
  getNowPlaying(): Promise<NowPlaying>;
}

export type Message = {
  canvas: OffscreenCanvas;
  dimension: {
    width: number;
    height: number;
  };
};

export type Sections = "musings" | "essays" | "contact";

export type Genre = "musings" | "poetry" | "engineering";

export const WRITING_GENRES: Genre[] = ["engineering", "musings", "poetry"];

export type SiteMap = "listening" | "reading" | "blocks" | "writing";

export const applicationKey = Symbol() as InjectionKey<Application>;

export type BlocksConfig = {
  token: string;
  baseUrl: string;
};
