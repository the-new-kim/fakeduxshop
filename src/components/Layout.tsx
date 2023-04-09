import { ReactNode } from "react";
import Header from "@/components/Header";

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <div className="relative flex flex-col min-h-screen w-full justify-start items-start [&>*]:w-full font-light">
      <Header />
      <main className="relative flex-grow h-full flex flex-col w-full [&>*]:flex-grow p-5">
        {children}
      </main>
    </div>
  );
}
