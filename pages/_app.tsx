import "../public/styles.css";

import React from "react";
import ReactDOM from "react-dom";
 
import { register } from "codelift";
register({ React, ReactDOM });

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
