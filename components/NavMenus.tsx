import { Menu } from "@headlessui/react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { Spinner } from "components/Spinner";
import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { ConnectorNames } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { classNames, truncateEthAddress } from "utils/functions";
import { MetamaskIcon } from "./icons/Metamask";

function Account() {
  const { account } = useWeb3React();

  return (
    <div className="text-gray-900 flex justify-between">
      <span>Account</span>
      <span>
        {account === null ? "-" : account ? truncateEthAddress(account) : ""}
      </span>
    </div>
  );
}

function Balance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState<BigNumberish | undefined>(undefined);

  useEffect((): any => {
    if (Boolean(account) && Boolean(library)) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(undefined);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div className="flex justify-between">
      <div className="text-left">Balance</div>
      <div>
        {!balance
          ? "Error"
          : balance
          ? `Ξ${Number(formatEther(balance)).toFixed(3)}`
          : ""}
      </div>
    </div>
  );
}

function ChainId() {
  const { chainId } = useWeb3React();

  return (
    <div className="flex justify-between">
      <span className="text-left">Chain Id</span>
      <span>{chainId ?? ""}</span>
    </div>
  );
}

function getErrorMessage(error: Error | undefined) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

export const LoggedInMenu: FC<{
  error: any;
  deactivate: any;
}> = ({ error, deactivate }) => {
  const { account } = useWeb3React();
  return (
    <div>
      <div className="py-3 px-4 text-sm space-y-1">
        <Account />
        <Balance />
        <ChainId />
      </div>
      <Menu.Item>
        {({ active }) => {
          return (
            <div className="text-gray-900">
              <Link href={`/address/${account}`}>
                <a
                  className={classNames(
                    "flex items-center px-4 py-2 text-gray-800",
                    active ? "bg-green-300" : "bg-gray-300"
                  )}
                >
                  Your Profile
                </a>
              </Link>
              {Boolean(error) ? (
                <h4
                  style={{
                    marginTop: "1rem",
                    marginBottom: "0",
                  }}
                >
                  {getErrorMessage(error)}
                </h4>
              ) : null}
            </div>
          );
        }}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => {
          return (
            <div className="text-gray-900">
              <a
                href="#"
                className={classNames(
                  "flex items-center px-4 py-2 text-gray-800",
                  active ? "bg-green-300" : "bg-gray-300"
                )}
                onClick={() => {
                  deactivate();
                }}
              >
                Sign Out
              </a>
              {Boolean(error) ? (
                <h4
                  style={{
                    marginTop: "1rem",
                    marginBottom: "0",
                  }}
                >
                  {getErrorMessage(error)}
                </h4>
              ) : null}
            </div>
          );
        }}
      </Menu.Item>
      {/* <Menu.Item>
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              "block px-4 py-2 text-sm text-gray-700 ",
              active ? "bg-gray-100" : "bg-green-400"
            )}
          >
            Sign out
          </a>
        )}
      </Menu.Item> */}
    </div>
  );
};

export const LoggedOutMenu: FC<{
  connectorsByName: any;
  activatingConnector: any;
  connector: any;
  triedEager: any;
  error: any;
  setActivatingConnector: any;
  activate: any;
}> = ({
  connectorsByName,
  activatingConnector,
  connector,
  triedEager,
  error,
  setActivatingConnector,
  activate,
}) => {
  return (
    <>
      <div className="px-4 pt-2 pb-2 text-xs font-semibold text-gray-800  ">
        Connect wallet using:
      </div>

      {Object.keys(connectorsByName).map((name: string) => {
        const connectorName = name as ConnectorNames;
        const currentConnector = connectorsByName[
          connectorName
        ] as AbstractConnector;
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled =
          !triedEager || !!activatingConnector || connected || !!error;

        return (
          <Menu.Item key={name}>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  "flex items-center px-4 py-2 text-gray-800",
                  active ? "bg-green-300" : "bg-gray-300"
                )}
                key={name}
                // disabled={disabled}
                onClick={() => {
                  setActivatingConnector(currentConnector);
                  activate(connectorsByName[connectorName]);
                }}
              >
                {activating && (
                  <Spinner color={"black"} className="inline h-4 w-4 mr-2" />
                )}

                {currentConnector ===
                connectorsByName[ConnectorNames.Injected] ? (
                  <MetamaskIcon className="inline h-4 w-4 mr-3" />
                ) : null}
                {currentConnector ===
                connectorsByName[ConnectorNames.WalletConnect] ? (
                  <div className="mr-3">
                    <Image
                      src="/images/walletconnect.webp"
                      height="16"
                      width="16"
                    />
                  </div>
                ) : null}
                {currentConnector ===
                connectorsByName[ConnectorNames.Ledger] ? (
                  <div className="mr-3">
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 466.59 466.16"
                      fill="currentColor"
                      className="h-4 w-4 text-gray-900"
                    >
                      <path
                        d="M5257.36,5484.78v-288a37.27,37.27,0,0,1,3.75-.35q104.74,0,209.49.11c24.19,0,43.91,9.74,59,28.58,10.45,13,16.15,28,16.19,44.74q.24,105.75.08,211.49c0,1.13-.15,2.25-.24,3.45Z"
                        transform="translate(-5079.36 -5196.39)"
                      />
                      <path
                        d="M5080.68,5484.79V5374.47h110.11v110.32Z"
                        transform="translate(-5079.36 -5196.39)"
                      />
                      <path
                        d="M5257.36,5552.16h110.26v110.4H5257.36Z"
                        transform="translate(-5079.36 -5196.39)"
                      />
                      <path
                        d="M5079.47,5307.09c0-10.73-.3-21.35.09-32,.28-7.44.63-15.06,2.41-22.24a74.79,74.79,0,0,1,72.4-56.48c11.8,0,23.6,0,35.65,0,.14,1.82.33,3.1.33,4.38,0,33.82-.06,67.63,0,101.45,0,3.74-.82,5.21-4.95,5.19-34.31-.12-68.62,0-102.94,0C5081.71,5307.43,5080.91,5307.25,5079.47,5307.09Z"
                        transform="translate(-5079.36 -5196.39)"
                      />
                      <path
                        d="M5435.23,5661.75V5552.41h110.63c0,12.12.28,24.23-.12,36.32a84.25,84.25,0,0,1-2.64,18.7c-8.18,30.82-35.43,52.54-68.35,54.21C5461.82,5662.3,5448.83,5661.75,5435.23,5661.75Z"
                        transform="translate(-5079.36 -5196.39)"
                      />
                      <path
                        d="M5080.44,5552.22H5189.9v108.86c-.26.2-.52.59-.78.58-17.44-.17-35,1.92-52.27-1.92-31.66-7-54.86-35.17-56.32-68.63C5080,5578.34,5080.44,5565.53,5080.44,5552.22Z"
                        transform="translate(-5079.36 -5196.39)"
                      />
                    </svg>
                  </div>
                ) : null}

                {name}
              </a>
            )}
          </Menu.Item>
        );
      })}
    </>
  );
};
