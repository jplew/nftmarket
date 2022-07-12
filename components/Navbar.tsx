import { Web3Provider } from "@ethersproject/providers";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWeb3React } from "@web3-react/core";
import { LoggedInMenu, LoggedOutMenu } from "components/NavMenus";
import { ConnectorNames } from "interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { classNames } from "utils/functions";
import { injected, ledger, walletconnect } from "../connectors";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { WalletIcon } from "components/icons/WalletIcon";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const user = {
  name: "Flurgy McFlurgface",
  email: "flurgy@flurksnft.com",
  imageUrl: "/images/flurk4434.png",
};
const navigation = [
  { name: "Collections", href: "/collections", current: true },
];

const connectorsByName: {
  [connectorName in ConnectorNames]: AbstractConnector;
} = {
  [ConnectorNames.Injected]: injected,
  // [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.Ledger]: ledger,
};

export function Navbar() {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();

  const {
    connector,
    library,
    account,
    activate,
    deactivate,
    active: walletActive,
    error,
  } = context;

  console.log({ error, account });

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center pl-2 md:pl-4 lg:pl-12">
                  <Link href="/">
                    <a>
                      <span className="font-semibold font-display text-green-300 tracking-wider">
                        NFT Market
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-0">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          router.pathname === item.href
                            ? "border-green-500 text-gray-300"
                            : "border-transparent text-gray-400 hover:border-green-300 hover:text-gray-200",
                          "inline-flex items-center px-5 pt-1 border-b-2 text-sm font-medium transition-all duration-200"
                        )}
                        aria-current={
                          router.pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-gray-300 focus:border-white focus:ring-gray-200 focus:text-gray-700 focus:placeholder-gray-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden lg:ml-4 lg:flex lg:items-center pr-12">
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-transparent rounded-full p-1 text-gray-400 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative flex-shrink-0 z-10">
                  <div>
                    <Menu.Button className="">
                      {walletActive || error ? (
                        <>
                          <span className="sr-only">Open user menu</span>
                          <div className="ml-3 flex-shrink-0 bg-gray-800 rounded-full mt-1 p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <img
                              className="h-8 w-8 rounded-full "
                              src="/images/flurk4434.png"
                              alt="Flurgy McFlurgface"
                            />
                          </div>
                        </>
                      ) : (
                        <a
                          type="button"
                          className="ml-3 flex-shrink-0 bg-transparent text-gray-400 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">Open Login Menu</span>
                          <WalletIcon />
                        </a>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md drop-shadow-lg py-1 bg-gray-400 ring-1 ring-black ring-opacity-5 focus:outline-none text-gray-900 pb-2 z-20">
                      {walletActive || error ? (
                        <LoggedInMenu {...{ error, deactivate }} />
                      ) : (
                        <LoggedOutMenu
                          {...{
                            connectorsByName,
                            activatingConnector,
                            connector,
                            triedEager,
                            error,
                            setActivatingConnector,
                            activate,
                          }}
                        />
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-b border-gray-700 md:hidden">
            <div className="px-2 py-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
