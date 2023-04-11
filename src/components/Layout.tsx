import { ReactNode } from "react";
import Header from "@/components/Header";
import Head from "next/head";
import type { ISEO } from "@/libs/types";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOutVariants } from "@/libs/variants";
import { slugify } from "@/libs/utils";

interface ILayoutProps {
  children: ReactNode;
  SEO: ISEO;
}

export default function Layout({
  children,
  SEO: {
    title: { siteTitle, pageTitle },
  },
}: ILayoutProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle}</title>
      </Head>
      <div className="w-full flex flex-col items-center justify-start">
        <div className="relative flex flex-col min-h-screen w-full justify-start items-center [&>*]:w-full font-light [&>*]:max-w-7xl">
          <Header siteTitle={siteTitle} />
          <AnimatePresence mode="wait">
            <motion.main
              key={slugify(router.asPath)}
              variants={fadeInOutVariants}
              initial="fadeOut"
              animate="fadeIn"
              exit="fadeOut"
              className="relative flex-grow h-full flex flex-col w-full px-5 pb-10 sm:mt-5 "
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <Footer />
        </div>
      </div>
    </>
  );
}
