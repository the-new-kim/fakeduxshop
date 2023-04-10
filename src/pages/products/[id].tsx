import { useAppSelector } from "@/redux/hooks";
import { getCategories } from "@/redux/slices/categorySlice";
import {
  IProduct,
  getProducts,
  selectFilteredProduct,
} from "@/redux/slices/productSlice";
import getStore from "@/redux/store";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

interface IProductPageProps {
  product: IProduct;
}

export default function ProductPage({ product }: IProductPageProps) {
  const router = useRouter();

  console.log("IS FALLBACK::::", router.isFallback);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product?.title}</h1>
      <div>{product?.description}</div>
      <div className="bg-white relative aspect-square">
        <Image
          fill
          alt={product.title}
          src={product.image}
          className="object-contain"
          sizes="100%" //???
          priority
        />
      </div>
    </div>
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

  // console.log(context.params.id);

  // const store = getStore();
  // await store.dispatch(getProducts());
  // await store.dispatch(getCategories());

  try {
    const product = await (
      await fetch(`https://fakestoreapi.com/products/${context.params.id}`)
    ).json();

    return {
      props: {
        // initialState: store.getState(),
        product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
