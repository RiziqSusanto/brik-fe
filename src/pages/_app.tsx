import { StoreProvider } from "../components/StoreProvider";
import nprogress from "nprogress";
import { Router } from "next/router";
import { ToastContainer } from "react-toastify";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "../../tailwindcss/styles.css";

nprogress.configure({ showSpinner: false }); // showSpinner : bool
Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.done());
Router.events.on("routeChangeError", () => nprogress.done());

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <StoreProvider {...pageProps}>
      {getLayout(
        <>
          <Component {...pageProps} />
          <ToastContainer position="top-center" />
        </>
      )}
    </StoreProvider>
  );
}

export default MyApp;
