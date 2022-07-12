import { HeartIcon } from "@heroicons/react/outline";
import { ITokenMetadata } from "interfaces";
import Link from "next/link";
import { FC } from "react";
import { getNftImageSrc } from "utils/functions";

export const NftBox: FC<{ nft: ITokenMetadata }> = ({ nft }) => {
  return (
    <li key={`${nft.token_address}${nft.token_id}`} className="relative">
      <div className="group block rounded-lg bg-gray-850 border border-gray-800 focus-within:ring-2 focus-within:ring-offset-2 overflow-hidden divide-y divide-gray-800 ring-0 ring-gray-700 hover:ring-2 transition-all duration-100">
        <Link href={`/collections/${nft.token_address}/${nft.token_id}`}>
          <a>
            <img
              src={getNftImageSrc(nft) || ""}
              alt={`${nft.name} #${nft.token_id}`}
              className="h-56 sm:h-56 md:h-44 lg:h-52 xl:h-52 2xl:h-56 max-h-64 w-full aspect-square object-cover pointer-events-none group-hover:scale-105 transition-scale duration-150 text-gray-600 text-xs"
            />
          </a>
        </Link>
        <div className="block p-4">
          <div className="text-xs font-medium mb-1">
            <Link href={`/collections/${nft.token_address}`}>
              <a className="tracking-wide text-gray-400 underline hover:text-green-300 hover:no-underline">
                {nft.name}
              </a>
            </Link>
          </div>
          <div className="tracking-wider text-sm font-bold">
            <Link href={`/collections/${nft.token_address}/${nft.token_id}`}>
              <a className="text-gray-300 hover:text-green-300">
                {nft.symbol} #{nft.token_id}
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-800 px-4 ">
            <div className="w-0 flex-1 flex">
              <button
                onClick={() => {}}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-start text-xs text-gray-400 tracking-wide font-medium border border-transparent hover:text-green-300 py-2"
              >
                <span className="">Place Bid</span>
              </button>
            </div>
            <div className="-ml-px w-0 flex-1 flex">
              <button
                className="relative w-0 flex-1 inline-flex items-center justify-end text-sm text-gray-700 font-medium border border-transparent rounded-br-lg py-2"
                onClick={() => {}}
              >
                <HeartIcon
                  className="h-5 w-5 text-gray-600 hover:text-red-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
