import { IProduct } from "@/libs/types";
import ProductDetailTemplate from "./ProductDetailTemplate";
import Heading from "./Heading";
import { useRef } from "react";
import useElementSize from "@/libs/client/useElementSize";
import ImageContainer from "./ImageContainer";
import ProductList from "./ProductList";
import ProductDetailHeader from "./ProductDetailHeader";
import Button from "./Button";
import { AnimatePresence, motion, useInView } from "framer-motion";

interface IProductDetailProps {
  product: IProduct;
  relatedProducts?: IProduct[];
}

export default function ProductDetail({
  product,
  relatedProducts,
}: IProductDetailProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const { clientHeight } = useElementSize(titleRef);

  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const isMobileHeaderInView = useInView(mobileHeaderRef);

  return (
    <>
      {titleRef && (
        <div
          className="hidden sm:block product-title-bg w-full fixed h-full top-0 left-0 z-30"
          style={{ height: `calc(${clientHeight * 2}px + 2.5rem)` }}
        />
      )}
      <ProductDetailTemplate>
        {/* MOBILE HEADER */}
        <div ref={mobileHeaderRef} className="sm:hidden">
          <ProductDetailHeader product={product} />
        </div>
        <ImageContainer
          src={product.image}
          alt={product.title}
          className="sm:sticky sm:top-5 h-auto z-40 max-h-[calc(100vh-2.5rem)]"
        />
        <div>
          {/* HEADER */}
          <div
            ref={titleRef}
            className="hidden sm:block mb-5 sticky top-5 w-full [&>*]:mb-3 flex-col justify-start items-start z-50"
          >
            <ProductDetailHeader product={product} />
          </div>

          {/* BODY */}
          <div className="relative flex flex-col justify-start items-start">
            {relatedProducts && (
              <>
                <p className="mt-10">{product.description}</p>
                <div className="mt-20">
                  <Heading tagName="h3" className="mb-5">
                    Related Products
                  </Heading>
                  <ProductList
                    products={relatedProducts.filter(
                      (relatedProduct) => relatedProduct.id !== product.id
                    )}
                    className="grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 "
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </ProductDetailTemplate>
      <AnimatePresence>
        {!isMobileHeaderInView && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            className="flex sm:hidden fixed bottom-0 left-0 p-5 justify-between items-center w-full bg-white z-50"
          >
            <Heading tagName="h3">{product.title}</Heading>
            <Button className="whitespace-nowrap">Add to Cart</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
