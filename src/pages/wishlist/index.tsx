import Layout from "@/components/Layout";
import { SITE_TITLE } from "@/libs/fakeData";

export default function WishlistPage() {
  return <Layout SEO={{ title: { siteTitle: SITE_TITLE } }}>WISH LIST</Layout>;
}
