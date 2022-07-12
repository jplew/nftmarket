export type User = {
  id: number;
  name: string;
};

export type ITrait = { trait_type: string; value: string };

export type ICollection = {
  creator: string;
  creatorAddress: string;
  contractAddress: string;
  imageUrl: string;
  name: string;
  symbol: string;
  slug: string;
  urls: Record<string, string>;
};

export type IFlurk = {
  token_id: string;
  image: string;
  token_uri: string;
  attributes: ITrait[];
  p_rarity: number;
};

export enum ConnectorNames {
  Injected = "Metamask",
  // Network = "Network",
  WalletConnect = "WalletConnect",
  Ledger = "Ledger",
  // Lattice = 'Lattice',
  // Frame = 'Frame',
  // Authereum = 'Authereum',
  // Fortmatic = 'Fortmatic',
  // Magic = 'Magic',
  // Portis = 'Portis',
  // Torus = 'Torus',
}

export type IMoralisNft = {
  token_address: string;
  token_id: string;
  contract_type: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_uri?: string | undefined;
  metadata?: string | undefined | any;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
  image?: string | undefined | null;
  imageUrl?: string | undefined | null;
  image_url?: string | undefined | null;
};

export type IMetadata = {
  name: string;
  attributes: { trait_type: string; value: string }[];
  external_url: string;
  tokendId: number;
  image?: string | undefined | null;
  imageUrl?: string | undefined | null;
  image_url?: string | undefined | null;
};

export type ITokenMetadata = {
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string;
  metadata?: IMetadata | any;
  synced_at?: string;
  amount?: string;
  name: string;
  symbol: string;
  block_number_minted?: string;
  block_number?: string;
  frozen?: number;
  is_valid?: number;
  owner_of?: string;
  syncing?: number;
  image?: string | undefined | null;
  imageUrl?: string | undefined | null;
  image_url?: string | undefined | null;
};

export type Chain =
  | "eth"
  | "0x1"
  | "ropsten"
  | "0x3"
  | "rinkeby"
  | "0x4"
  | "goerli"
  | "0x5"
  | "kovan"
  | "0x2a"
  | "polygon"
  | "0x89"
  | "mumbai"
  | "0x13881"
  | "bsc"
  | "0x38"
  | "bsc testnet"
  | "0x61"
  | "avalanche"
  | "0xa86a"
  | "avalanche testnet"
  | "0xa869"
  | "fantom"
  | "0xfa";
