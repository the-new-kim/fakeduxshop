import Heading from "@/components/Heading";
import Layout from "@/components/Layout";
import { SITE_TITLE } from "@/libs/fakeData";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);

  return (
    <Layout SEO={{ title: { siteTitle: SITE_TITLE } }}>
      <div>
        <Heading className="mb-5" tagName="h3">
          Cart
        </Heading>
      </div>
    </Layout>
  );
}
