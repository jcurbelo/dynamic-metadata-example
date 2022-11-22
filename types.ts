export type Metadata = {
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
  animation_url: string;
  background_color: string;
  youtube_url: string;
  external_url: string;
};

export type Token = {
  data: Metadata;
  tokenId: string;
  id: string;
};

export type ApiResponse = {
  hasNextPage: boolean;
  totalCount: number;
  data: Token[];
};
