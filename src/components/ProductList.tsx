import { IProduct } from "@/libs/types";
import ProductListItem from "./ProductListItem";

interface IProductListProps {
  products: IProduct[];
  className?: string;
}

export default function ProductList({
  products,
  className = "",
}: IProductListProps) {
  return (
    <ul
      className={
        "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 " +
        className
      }
    >
      {products.map((product, index) => (
        <ProductListItem key={product.id} product={product} index={index} />
      ))}
    </ul>
  );
}
