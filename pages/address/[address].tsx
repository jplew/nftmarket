import Layout from "components/Layout";
import { LoadingSkeleton } from "components/LoadingSkeleton";
import { NftBox } from "components/NftBox";
import { IMoralisNft, ITokenMetadata } from "interfaces";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { getNftImageSrc, truncateEthAddress } from "utils/functions";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const address = params?.address as string;

  return {
    props: {
      address,
    },
  };
};

function AddressPage(): InferGetServerSidePropsType<typeof getServerSideProps> {
  const router = useRouter();

  const currentAddress = router.query.address as string;

  const { isInitialized } = useMoralis();

  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances(
    { chain: "0x1", address: currentAddress, limit: 100 }
  );

  useEffect(() => {
    async function fetchNfts() {
      if (isInitialized) {
        await getNFTBalances({
          params: { chain: "0x1", address: currentAddress, limit: 100 },
        });
        // console.log({ data });
      }
    }
    fetchNfts();
  }, [currentAddress, isInitialized]);

  const sortByCollectionName = (nftA: IMoralisNft, nftB: IMoralisNft) => {
    if (!nftA.name || !nftB.name) {
      return 0;
    }

    const nameA = nftA.name.toUpperCase();
    const nameB = nftB.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  const removeNoImage = (nft: IMoralisNft) => {
    const src = getNftImageSrc(nft);
    // some undefined images look like this: https://gateway.ipfs.io/ipfs/unset
    if (src && src.slice(-5) === "unset") {
      return false;
    }
    return Boolean(src);
  };

  const NFTBalances = () => {
    return (
      <div>
        {isLoading ? <LoadingSkeleton /> : null}
        {error && <>{JSON.stringify(error)}</>}
        {/* <button
          onClick={() =>
            getNFTBalances({
              params: { chain: "0x1", address: currentAddress },
            })
          }
        >
          Refetch NFTBalances
        </button> */}

        {/* <div>{isLoading.toString()}</div>
        <div>{isFetching.toString()}</div> */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {data?.result
            ?.filter(removeNoImage)
            .sort(sortByCollectionName)
            .map((nft: ITokenMetadata) => (
              <NftBox key={`${nft.token_address}${nft.token_id}`} nft={nft} />
            ))}
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title={`NFT Market | Address ${router.query.address}`}
      boldHeading={false}
      breadcrumb={{
        first: {
          title: "Address",
          href: null,
        },
        second: {
          title: truncateEthAddress(router.query.address as string),
          href: null,
        },
      }}
    >
      <main className="-mt-32">
        <div className="max-w-screen-2xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-xl shadow px-5 py-6 sm:px-6">
            <div className="mx-auto px-4 max-w-screen-2xl sm:px-6 lg:px-8 py-8">
              <div className="space-y-12">
                <NFTBalances />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default AddressPage;
