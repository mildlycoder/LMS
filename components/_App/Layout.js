import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import GoTop from "@/components/_App/GoTop";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";

const Layout = ({ children }) => {


  return (
    <>
      <Head>
        <title>Happy notes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {children}

      <Script src="https://meet.jit.si/external_api.js" />

      <Toaster />

      <GoTop />
    </>
  );
};

export default Layout;
