import Heading from "./Heading";
import Button from "./Button";
import { IProduct } from "@/libs/types";
import useCurrencyConvert from "@/libs/client/useCurrencyConverter";
import { Star } from "@phosphor-icons/react";
import { useAppDispatch } from "@/redux/hooks";
import { setCart } from "@/redux/slices/cartSlice";

interface IProductDetailHeaderProps {
  product: IProduct;
}

export default function ProductDetailHeader({
  product,
}: IProductDetailHeaderProps) {
  const price = useCurrencyConvert(product.price);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setCart({ id: product.id, quantity: 1 }));
  };

  return (
    <>
      <Heading tagName="h3" className="mb-5">
        {product.title}
      </Heading>
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center">
          {Array.from(Array(5)).map((_, index) => (
            <span key={index}>
              <Star
                weight={
                  index < Math.round(product.rating.rate) ? "fill" : "regular"
                }
              />
            </span>
          ))}
        </div>
        <div className="flex justify-end items-center [&>*]:ml-3 ">
          <div className="text-xl">{price}</div>

          <Button onClick={onClick}>Add to Cart</Button>
        </div>
      </div>
    </>
  );
}
