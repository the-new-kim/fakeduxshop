import Link from "next/link";
import { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  link?: (() => any) | string;
  className?: string;
  [key: string]: any;
}

export default function Button({
  children,
  link,
  className = "",
  ...rest
}: IButtonProps) {
  const defaultClassName =
    "bg-[rgb(var(--foreground-rgb))] hover:bg-[rgb(var(--background-end-rgb))] text-[rgb(var(--background-end-rgb))] hover:text-[rgb(var(--foreground-rgb))] border-[rgb(var(--foreground-rgb))] border-[1px] py-2 px-4 duration-300 transition-colors ";

  return (
    <>
      {typeof link === "string" ? (
        <Link className={defaultClassName + className} href={link}>
          {children}
        </Link>
      ) : (
        <button
          className={defaultClassName + className}
          onClick={link}
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
}
