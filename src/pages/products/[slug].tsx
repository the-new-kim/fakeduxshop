import { getCategories } from "@/redux/server/slices/categorySlice";
import { getProducts } from "@/redux/server/slices/productSlice";
import getStore from "@/redux/server/store";
import { GetStaticProps } from "next";

export default function ProductPage() {
  return <div>ProductDetail</div>;
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context?.params?.slug) {
    return { props: {} };
  }

  console.log(context.params.slug);

  const store = getStore();
  await store.dispatch(getProducts());
  await store.dispatch(getCategories());

  return {
    props: {
      initialState: store.getState(),
    },
  };
};
