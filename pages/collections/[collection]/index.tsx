import Layout from "components/Layout";
import { LoadingBoxArray } from "components/LoadingSkeleton";
import { NftBox } from "components/NftBox";
import { LoadingSpinner } from "components/Spinner";
import { Chain, ITokenMetadata } from "interfaces";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getDefaultCollectionName, getNftImageSrc } from "utils/functions";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

type IMappedNft = {
  metadata: any;
  image: string | null | undefined;
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string | undefined;
  synced_at?: string | undefined;
  last_token_uri_sync?: string | undefined;
  last_metadata_sync?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
};

function CollectionPage() {
  const { Moralis, isInitialized } = useMoralis();
  const [nfts, setNfts] = useState<IMappedNft[]>([]);
  const [result, setResult] = useState<any>([]);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const router = useRouter();
  const contractAddress = router.query.collection as string;

  const [contractData, setContractData] = useState<{
    name: string;
    symbol: string;
  }>({ name: getDefaultCollectionName(contractAddress), symbol: "NFT" });

  const limit = 50;

  useEffect(() => {
    async function fetchNfts() {
      if (isInitialized) {
        let cursor = undefined;

        const options = {
          address: contractAddress,
          chain: "0x1" as Chain,
          limit,
          cursor,
        };

        const nftRes = await Moralis.Web3API.token.getAllTokenIds(options);

        setResult(nftRes);

        if (!nftRes || !nftRes.result) {
          return;
        }

        const { name, symbol } = nftRes?.result[0];
        setContractData({ name, symbol });

        const mappedNfts = nftRes.result.map((result) => {
          const parsedMetadata = JSON.parse(result.metadata as string);
          return {
            ...result,
            metadata: {
              ...parsedMetadata,
            },
            image: getNftImageSrc(parsedMetadata),
          };
        });

        // console.log({ mappedNfts });
        setNfts(mappedNfts);

        setIsLoaded(true);
      }
    }
    fetchNfts();
  }, [isInitialized]);

  return (
    <Layout
      title={`${contractData.name} | NFT Market`}
      breadcrumb={{
        first: { title: "Collections", href: "/collections" },
        second: { title: contractData.name, href: null },
      }}
    >
      <main className="-mt-32">
        <div className="max-w-screen-2xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-xl shadow px-5 py-6 sm:px-6">
            <div className="mx-auto px-4 max-w-screen-2xl sm:px-6 lg:px-8 py-8">
              <div className="space-y-12">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                >
                  {!isLoaded ? <LoadingBoxArray /> : null}

                  {nfts &&
                    nfts.map((nft: ITokenMetadata) => (
                      <NftBox key={nft.token_id} nft={nft} />
                    ))}
                </ul>
              </div>
              <div className="max-w-2xl mx-auto flex justify-center mt-12">
                {isLoaded && !isFetching ? (
                  <button
                    type="button"
                    className="inline-flex items-center px-8 py-2 border border-gray-600 shadow-sm text-sm font-semibold rounded-md text-gray-200 bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all tracking-wide w-48 justify-center"
                    onClick={async () => {
                      setIsFetching(true);
                      const nftRes = await result.next();

                      if (!nftRes.result) {
                        return;
                      }

                      const mappedNfts = nftRes.result.map((result: any) => {
                        const parsedMetadata = JSON.parse(
                          result.metadata as string
                        );
                        return {
                          ...result,
                          metadata: {
                            ...parsedMetadata,
                          },
                          image: getNftImageSrc(parsedMetadata),
                        };
                      });

                      setNfts([...nfts, ...mappedNfts]);
                      setIsFetching(false);
                    }}
                  >
                    <div>Load More</div>
                  </button>
                ) : null}
                {isFetching ? (
                  <button
                    type="button"
                    className="inline-flex items-center px-8 py-2 border border-gray-600 shadow-sm text-sm font-semibold rounded-md text-gray-200 bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all tracking-wide w-48 justify-center"
                  >
                    <div className="w-5 h-5">
                      <LoadingSpinner />
                    </div>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default CollectionPage;
