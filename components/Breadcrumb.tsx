import Link from "next/link";
import { NextRouter } from "next/router";
import React from "react";
import { getSplitPath, toTitleCase } from "utils/functions";
import { IBreadcrumb } from "./Layout";

function getFirstBreadcrumb(str: string) {
  if (!str) {
    return "Homepage";
  }
  return toTitleCase(str);
}

export const Breadcrumb = ({
  router,
  bold,
  breadcrumb,
}: {
  router: NextRouter;
  bold: boolean;
  breadcrumb?: IBreadcrumb;
}) => {
  if (!router) {
    return null;
  }

  const pathSplit = getSplitPath(router);

  return (
    <>
      {pathSplit.length > 2 ? (
        <>
          <span>
            {breadcrumb ? (
              breadcrumb.first.href ? (
                <Link href={breadcrumb.first.href || "#"}>
                  <a className="hover:text-green-200 font-normal text-gray-400">
                    {breadcrumb.first.title}
                  </a>
                </Link>
              ) : (
                <span className="font-normal text-gray-400">
                  {breadcrumb.first.title}
                </span>
              )
            ) : (
              <Link href={`/${pathSplit[1]}`}>
                <a className="hover:text-green-200 font-normal text-gray-400">
                  {getFirstBreadcrumb(pathSplit[1])}
                </a>
              </Link>
            )}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-2 inline text-green-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className={bold ? "font-bold" : "font-normal"}>
            {breadcrumb
              ? `${breadcrumb.second?.title || "?"}`
              : toTitleCase(pathSplit[2])}
          </span>
        </>
      ) : (
        <span>{getFirstBreadcrumb(pathSplit[1])}</span>
      )}
    </>
  );
};

export default Breadcrumb;
