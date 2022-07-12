import { PlaceBidButtonGroup } from "components/BuyButtonGroup";
import Layout from "components/Layout";
import { LoadingSkeletonRight } from "components/LoadingSkeleton";
import { Chain, IMetadata, ITokenMetadata, ITrait } from "interfaces";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  getDefaultCollectionName,
  getNftImageSrc,
  truncateEthAddress,
} from "utils/functions";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const LoadingSkeletonImage = () => {
  return (
    <div className="border border-gray-800 shadow rounded-xl p-4 w-full">
      <div className="animate-pulse flex flex-col justify-center items-center">
        <div className="rounded-lg bg-gradient-to-r from-gray-700 h-80 w-full aspect-square"></div>
      </div>
    </div>
  );
};

function TheImage({ metadata }: { metadata?: ITokenMetadata }) {
  if (!metadata) {
    return (
      <span className="text-gray-800">
        <img
          src="/images/broken.svg"
          height="200"
          width="200"
          alt="not found"
        />
      </span>
    );
  }
  return (
    <img
      src={metadata?.image || ""}
      height="500"
      width="500"
      alt={`${metadata?.name} #${metadata?.token_id}`}
    />
  );
}
function NftPage() {
  const { Moralis, isInitialized } = useMoralis();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [metadata, setMetadata] = useState<ITokenMetadata>();

  const router = useRouter();
  const nftId = router.query.nft as string;
  const contractAddress = router.query.collection as string;

  useEffect(() => {
    async function fetchNft() {
      if (isInitialized) {
        const options = {
          address: contractAddress,
          token_id: nftId,
          chain: "0x1" as Chain,
        };
        const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
          options
        );
        const metadata: IMetadata = JSON.parse(
          tokenIdMetadata.metadata as string
        );

        if (!metadata) {
          setIsLoaded(true);
          return;
        }

        let attributesArray: ITrait[] = metadata?.attributes;

        //normalize metadata. Sometimes it's an object sometimes it's an array.
        if (
          Boolean(metadata.attributes) &&
          !Array.isArray(metadata.attributes)
        ) {
          attributesArray = Object.entries(metadata.attributes).map(
            ([key, val]: any) => {
              return { trait_type: key, value: val };
            }
          );
        }
        setMetadata({
          ...tokenIdMetadata,
          metadata: { ...metadata, attributes: attributesArray },
          image: getNftImageSrc(tokenIdMetadata),
        });
        setIsLoaded(true);
      }
    }
    fetchNft();
  }, [isInitialized]);

  const collectionName =
    metadata?.name || getDefaultCollectionName(contractAddress);

  return (
    <Layout
      title={`${collectionName} #${nftId} | NFT Market`}
      breadcrumb={{
        first: {
          title: collectionName,
          href: `/collections/${contractAddress}`,
        },
        second: { title: `#${nftId}`, href: null },
      }}
    >
      <main className="-mt-32">
        <div className="max-w-screen-2xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-xl shadow px-5 py-6 sm:px-10 lg:p-10">
            <div className="mx-auto max-w-screen-2xl grid grid-cols-5 gap-x-6 sm:gap-x-10 ">
              <div className="space-y-6 col-span-5 sm:col-span-2">
                <div className="text-gray-700">
                  {isLoaded ? (
                    <TheImage metadata={metadata} />
                  ) : (
                    <LoadingSkeletonImage />
                  )}
                </div>
              </div>
              <div className="space-y-6 col-span-5 sm:col-span-3">
                <div className="space-y-8">
                  {isLoaded ? (
                    <>
                      <div>
                        <p className="my-2 block text-xl font-bold text-yellow-200 tracking-wider font-display">
                          {collectionName} #{nftId}
                        </p>

                        <p className="block text-sm font-medium text-gray-400">
                          {metadata?.owner_of ? (
                            <>
                              <span>owned by </span>
                              <Link href={`/address/${metadata?.owner_of}`}>
                                <a className="hover:text-green-200 underline hover:no-underline">
                                  {truncateEthAddress(metadata?.owner_of)}
                                </a>
                              </Link>{" "}
                            </>
                          ) : null}
                        </p>
                      </div>

                      <div>
                        <PlaceBidButtonGroup />
                      </div>

                      {metadata?.metadata.attributes ? (
                        <div>
                          <h3 className="mb-2 tracking-wider text-yellow-100 font-display">
                            Traits
                          </h3>
                          <ul className="text-sm text-gray-300 space-y-1 tracking-wide">
                            {metadata?.metadata?.attributes.map(
                              (trait: ITrait) => {
                                return (
                                  <li className="flex" key={trait.value}>
                                    <span className="text-yellow-100 font-semibold">
                                      {trait.trait_type}:{" "}
                                    </span>
                                    <span className="text-gray-300 ml-2 font-light">
                                      {trait.value}{" "}
                                    </span>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-gray-200">No metadata found.</div>
                      )}
                    </>
                  ) : (
                    <LoadingSkeletonRight />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default NftPage;
