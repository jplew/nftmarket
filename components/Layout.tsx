import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";

export type IBreadcrumb = {
  first: ICrumb;
  second?: ICrumb;
};

export type ICrumb = { title: string; href: string | null; bold?: boolean };

type Props = {
  children?: ReactNode;
  title?: string;
  breadcrumb?: IBreadcrumb;
  boldHeading?: boolean;
};

const Layout = ({
  children,
  boldHeading = true,
  breadcrumb,
  title = "This is the default title",
}: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header breadcrumb={breadcrumb} boldHeading={boldHeading} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

const Header = ({
  boldHeading,
  breadcrumb,
}: {
  breadcrumb?: IBreadcrumb;
  boldHeading: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="min-h-full">
      <div className="bg-gray-850 pb-32">
        <header className="py-8">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl text-gray-200 ml-2 md:ml-4 lg:ml-12">
              <Breadcrumb
                router={router}
                bold={boldHeading}
                breadcrumb={breadcrumb}
              />
            </h1>
          </div>
        </header>
      </div>
    </div>
  );
};
