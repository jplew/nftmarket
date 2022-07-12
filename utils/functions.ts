import { IMetadata, ITokenMetadata } from "interfaces";
import { NextRouter } from "next/router";

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function splitPath(path: string) {
  const pathSplit = path.split("/");
  return pathSplit;
}

export function getSplitPath(router: NextRouter) {
  return splitPath(router.asPath);
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const fixIpfsImage = (image: string) => {
  if (image.slice(0, 7) === "ipfs://") {
    return `https://gateway.ipfs.io/ipfs/${image.slice(7)}`;
  }
  return image;
};

export const truncateEthAddress = (account: string | undefined) => {
  if (!account) {
    return "???";
  }
  return `${account.substring(0, 6)}...${account.substring(
    account.length - 5
  )}`;
};

export const getNftImageSrc = (nft: ITokenMetadata) => {
  let metadataObj: IMetadata = {} as IMetadata;

  if (!nft) {
    return;
  }
  //sometimes metadata is a string that needs to be parsed
  if (typeof nft.metadata === "string") {
    metadataObj = JSON.parse(nft.metadata);
  }
  const imageUrl =
    nft.image ||
    nft.imageUrl ||
    nft.image_url ||
    nft.metadata?.image_url ||
    nft.metadata?.imageUrl ||
    nft.metadata?.image ||
    metadataObj?.image ||
    metadataObj?.image_url ||
    metadataObj?.imageUrl;

  if (!imageUrl) {
    return null;
  }

  return fixIpfsImage(imageUrl);
};

export const getDefaultCollectionName = (address: string) => {
  if (address === "0xde6b6090d32eb3eeae95453ed14358819ea30d33") {
    return "Flurks by Stonetoss";
  }
  return truncateEthAddress(address);
};

