export const PlaceBidButtonGroup = () => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-6 py-2 rounded-l-md border border-gray-800 bg-gray-800 text-sm font-semibold text-black  focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
      >
        Buy Now
      </button>

      <button
        type="button"
        className="-ml-px relative inline-flex items-center px-6 py-2 rounded-r-md border border-yellow-300 bg-yellow-300 text-sm font-bold text-gray-800 hover:text-gray-900 hover:bg-yellow-400 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-all cursor-pointer"
        disabled
      >
        Place Bid
      </button>
    </span>
  );
};

export const BuyButtonGroup = () => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className="relative inline-flex items-center px-6 py-2 rounded-l-md border border-yellow-500 bg-yellow-400 text-sm font-bold text-gray-800 hover:text-gray-900 hover:bg-yellow-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all cursor-pointer"
      >
        Buy Now
      </button>

      <button
        type="button"
        className="-ml-px relative inline-flex items-center px-6 py-2 rounded-r-md border border-gray-800 bg-gray-800 text-sm font-semibold text-black  focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-not-allowed"
      >
        Place Bid
      </button>
    </span>
  );
};
