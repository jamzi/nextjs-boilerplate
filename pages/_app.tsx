import React from "react";
import App from "next/app";
import Head from "next/head";
import * as Sentry from "@sentry/browser";

import { initGA, logPageView } from "../utils/analytics";

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

export default class MyApp extends App {
  componentDidMount() {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
