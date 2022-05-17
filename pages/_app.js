/* eslint-disable @next/next/no-sync-scripts */
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import React from "react";

import Head from "next/head";
import { uuid } from "uuidv4";

import config from "../lib/config";

class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loaded: false,
      loaded: true,
    };
  }

  componentDidMount() {
    const { FIREBASE_CONFIG } = config;
    firebase.initializeApp(FIREBASE_CONFIG);
    window.database = firebase.database();
    this.setState({ loaded: true });

    if (localStorage.getItem("americandream-client-id") === null) {
      localStorage.setItem("americandream-client-id", uuid());
    }
  }
  render() {
    return (
      <>
        <Head>
          <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js"></script>
          <script src="https://www.gstatic.com/firebasejs/7.22.1/firebase-database.js"></script>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        {this.state.loaded ? (
          this.props.children
        ) : (
          <div className="flex items-center justify-center w-full h-screen bg-black">
            <h1 className="text-3xl text-white">Loading...</h1>
          </div>
        )}
      </>
    );
  }
}
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <FirebaseProvider>
        <Component {...pageProps} />
      </FirebaseProvider>
    </>
  );
}
