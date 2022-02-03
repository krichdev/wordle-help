import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />
}

export default MyApp
