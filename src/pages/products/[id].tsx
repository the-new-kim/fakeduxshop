import Layout from "@/components/Layout";
import ProductDetail from "@/components/ProductDetail";
import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { Skeleton } from "@/components/Skeleton";
import { getProductById } from "@/libs/api";
import { SITE_TITLE } from "@/libs/fakeData";
import type { IPageProps, IProduct, ISEO } from "@/libs/types";

import { GetStaticProps } from "next";

import { useRouter } from "next/router";

interface IProductPageProps extends IPageProps {
  product: IProduct;
  relatedProducts: IProduct[];
}

export default function ProductPage({
  product,
  SEO,
  relatedProducts,
}: IProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout
        SEO={{
          title: {
            siteTitle: SITE_TITLE,
            pageTitle: "Loading...",
          },
        }}
      >
        <ProductDetailTemplate>
          <div>
            <Skeleton className="h-[40vh] sm:h-[80vh]" />
          </div>
          <div>
            <div className="mb-10">
              <Skeleton />
            </div>
            <div className="[&>*]:mb-3">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </ProductDetailTemplate>
      </Layout>
    );
  }

  return (
    <Layout SEO={SEO}>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context?.params?.id) {
    return { props: {} };
  }

  try {
    const product: IProduct = await getProductById(context.params.id as string);

    const SEO: ISEO = {
      title: {
        siteTitle: SITE_TITLE,
        pageTitle: product.title,
      },
    };

    const relatedProducts: IProduct[] = await (
      await fetch(
        `https://fakestoreapi.com/products/category/${product.category}`
      )
    ).json();

    return {
      props: {
        product,
        relatedProducts,
        SEO,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
