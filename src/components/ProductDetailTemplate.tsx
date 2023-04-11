import { ReactNode } from "react";

interface IProductDetailTemplateProps {
  children: ReactNode;
}

export default function ProductDetailTemplate({
  children,
}: IProductDetailTemplateProps) {
  return (
    <div className="w-full relative grid grid-cols-1 sm:grid-cols-2 gap-5">
      {children}
    </div>
  );
}
