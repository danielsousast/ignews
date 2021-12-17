import React, { Fragment } from "react";
import Head from "next/head";

import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <h1 className={styles.title}>Hello World</h1>
    </Fragment>
  );
}
