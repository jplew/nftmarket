import Layout from "components/Layout";
import { ICollection } from "interfaces";
import Link from "next/link";

const collections: ICollection[] = require("public/data/collections.json");

const IndexPage = () => (
  <Layout title="Collections">
    <main className="-mt-32">
      <div className="max-w-screen-2xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="mx-auto px-4 max-w-screen-2xl sm:px-6 lg:px-8 py-8">
            <div className="space-y-12">
              <ul
                role="list"
                className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
              >
                {collections.map((collection) => {
                  const address = `/collections/${collection.contractAddress}`;
                  return (
                    <li
                      key={collection.name}
                      className="overflow-hidden transition-all group duration-100 rounded-lg"
                    >
                      <div className="space-y-4">
                        <div className="">
                          <Link href={address}>
                            <a>
                              <img
                                className="h-56 sm:h-56 md:h-44 lg:h-52 2xl:h-64 max-h-64 w-full object-cover shadow-lg aspect-square group-hover:scale-105 transition-scale duration-150 "
                                src={collection.imageUrl}
                                alt=""
                              />
                            </a>
                          </Link>
                        </div>

                        <div className="space-y-2">
                          <div className="text-lg leading-6 space-y-1">
                            <Link href={address}>
                              <a className="group-hover:text-green-300 transition-all underline hover:no-underline">
                                <h3>
                                  {collection.name}
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 ml-1 inline text-green-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </h3>
                              </a>
                            </Link>

                            <p className="text-sm text-gray-500">
                              by{" "}
                              <Link
                                href={`/address/${collection.creatorAddress}`}
                              >
                                <a className="hover:text-green-300 underline hover:no-underline hover:font-light">
                                  {collection.creator}
                                </a>
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
);

export default IndexPage;
