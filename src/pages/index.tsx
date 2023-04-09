import { IProduct, getProducts } from "@/redux/slices/productSlice";
import getStore, { RootState, selectFilteredProduct } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const products = useSelector(selectFilteredProduct);

  console.log(products);

  return (
    <main>
      <h1>Home</h1>
      <ul>
        {products.slice(0, 10).map((product) => (
          <li>{product.id}</li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  const store = getStore();
  await store.dispatch(getProducts() as any); // ⚠️ Argument of type 'AsyncThunkAction<any, void, AsyncThunkConfig>' is not assignable to parameter of type 'AnyAction'.
  return {
    props: {
      initialState: store.getState(),
    },
  };
}
