import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import { SITE_TITLE } from "@/libs/fakeData";
import { IPageProps, IProduct, ISEO } from "@/libs/types";

interface IHomeProps extends IPageProps {
  products: IProduct[];
}

export default function Home({ products, SEO }: IHomeProps) {
  return (
    <Layout SEO={SEO}>
      <main>
        <Heading tagName="h3" className="mb-5">
          Top 10 Products
        </Heading>
        <ProductList products={products.slice(0, 10)} />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const products = await (
    await fetch("https://fakestoreapi.com/products")
  ).json();

  const SEO: ISEO = {
    title: {
      siteTitle: SITE_TITLE,
    },
  };

  return {
    props: {
      products,
      SEO,
    },
  };
}
