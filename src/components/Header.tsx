import {
  Heart,
  MagnifyingGlass,
  ShoppingCart,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";
import CurrencySelector from "./CurrencySelector";

import { useAppSelector } from "@/redux/hooks";
import Heading from "./Heading";
import { Skeleton } from "./Skeleton";

interface IHeaderProps {
  siteTitle: string;
}

export default function Header({ siteTitle }: IHeaderProps) {
  const { error, exchangeRates, pending } = useAppSelector(
    (state) => state.exhcangeRateSlice
  );

  return (
    <header className="w-full flex justify-between items-center p-5 z-50">
      <Link href="/">
        <Heading tagName="h1">{siteTitle}</Heading>
      </Link>
      <nav className="text-2xl">
        <ul className="flex [&>*]:ml-3 items-center">
          {/* <li>
            <MagnifyingGlass />
          </li> */}

          <li>
            {pending && !exchangeRates ? (
              <Skeleton className="w-20" />
            ) : (
              <CurrencySelector />
            )}
          </li>
          {/* <li>
            <Link href="/wishlist">
              <Heart />
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </li>
          <li>
            <Link href="/account">
              <User />
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
