import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Navbar } from "components/Navbar";
// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import { ReactNode } from "react";
import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider {
  const library = new Web3Provider(provider);

  library.pollingInterval = 12000;
  return library;
}

const serverUrl = "https://yk5nkdtqwyj5.usemoralis.com:2053/server";
const appId = "QZloLeKa2dXD0lXtNqBLCiTG3GowCcn2aaGkpuSt";

export default function ({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App>
          <Component {...pageProps} />
        </App>
      </Web3ReactProvider>
    </MoralisProvider>
  );
}

function App(props: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
