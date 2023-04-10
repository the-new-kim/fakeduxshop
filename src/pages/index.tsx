import { slugify } from "@/libs/utils";
import { useAppSelector } from "@/redux/server/hooks";
import { getCategories } from "@/redux/server/slices/categorySlice";
import { getProducts } from "@/redux/server/slices/productSlice";
import getStore, {
  RootState,
  selectFilteredProduct,
} from "@/redux/server/store";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const products = useAppSelector(selectFilteredProduct);

  return (
    <main>
      <h1>Home</h1>
      <ul className="grid grid-cols-6 gap-5">
        {products.slice(0, 10).map((product) => (
          <li key={product.id} className="flex flex-col">
            <Link href={`/products/${slugify(product.title)}`}>
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

              <h3>{product.title}</h3>
              {/* <small>{price || getCurrencyFormat("USD", product.price)}</small> */}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const store = getStore();
  await store.dispatch(getProducts());
  await store.dispatch(getCategories());

  return {
    props: {
      initialState: store.getState(),
    },
  };
}
