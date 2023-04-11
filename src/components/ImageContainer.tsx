import { cls } from "@/libs/utils";
import { Heart } from "@phosphor-icons/react";
import Image from "next/image";

interface IImageContainerProps {
  src: string;
  alt?: string;
  aspect?: "square" | "video";
  objectFit?: "contain" | "cover" | "fit";
  className?: string;
}

export default function ImageContainer({
  src,
  alt = "",
  aspect = "square",
  objectFit = "contain",
  className = "",
}: IImageContainerProps) {
  return (
    <div
      className={
        "bg-white flex justify-center items-center relative p-10 shadow-md group overflow-hidden " +
        className
      }
    >
      {/* <div className="text-3xl absolute top-0 left-0 z-50 p-3">
        <Heart weight="thin" />
      </div> */}
      <div
        className={`w-full relative aspect-square group-hover:scale-105 transition-transform duration-300 ${cls(
          aspect === "square"
            ? "aspect-square"
            : aspect === "video"
            ? "aspect-video"
            : "aspect-auto"
        )}`}
      >
        <Image
          fill
          alt={alt}
          src={src}
          className={cls(
            objectFit === "contain"
              ? "object-contain"
              : objectFit === "cover"
              ? "object-cover"
              : "object-fill"
          )}
          sizes="100%" //???
          priority
        />
      </div>
    </div>
  );
}

{
  /* <div className="bg-white relative aspect-square">
<Image
  fill
  alt={product.title}
  src={product.image}
  className="object-contain"
  sizes="100%" //???
  priority
/>
</div> */
}
