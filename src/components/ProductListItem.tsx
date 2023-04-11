import useCurrencyConvert from "@/libs/client/useCurrencyConverter";
import { IProduct } from "@/libs/types";
import Link from "next/link";
import ImageContainer from "./ImageContainer";
import { motion } from "framer-motion";

interface IProductListItemProps {
  product: IProduct;
  index: number;
}

export default function ProductListItem({
  product,
  index,
}: IProductListItemProps) {
  const price = useCurrencyConvert(product.price);

  return (
    <motion.li
      className="flex flex-col w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.02 }}
    >
      <Link href={`/products/${product.id}`}>
        <ImageContainer
          src={product.image}
          alt={product.title}
          className="p-3"
        />

        <div className="flex flex-col justify-start items-start mt-2">
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-full block">
            {product.title}
          </div>
          <div>{price}</div>
        </div>
      </Link>
    </motion.li>
  );
}
