import {
  Heart,
  MagnifyingGlass,
  ShoppingCart,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";
import CurrencySelector from "./CurrencySelector";

export default function Header() {
  return (
    <header className="w-full p-5 flex-col [&>*]:w-full [&>*]:flex [&>*]:justify-between [&>*]:items-center">
      <div>
        <Link href="/">Fakestore</Link>
        <nav>
          <ul className="flex [&>*]:ml-3 items-center">
            <li>
              <MagnifyingGlass />
            </li>
            <li>
              <CurrencySelector />
            </li>
            <li>
              <Heart />
            </li>
            <li>
              <ShoppingCart />
            </li>
            <li>
              <User />
            </li>
          </ul>
        </nav>
      </div>
      <div className="bg-slate-300">
        <nav>
          <ul>category</ul>
        </nav>
      </div>
    </header>
  );
}
