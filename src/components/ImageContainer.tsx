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
        className={`w-full relative aspect-square group-hover:scale-105 transition-transform duration-300 flex justify-center items-center `}
      >
        <Image
          alt={alt}
          src={src}
          className={`w-full h-auto
          ${cls(
            objectFit === "contain"
              ? "object-contain"
              : objectFit === "cover"
              ? "object-cover"
              : "object-fill"
          )} 
          
          ${cls(
            aspect === "square"
              ? "aspect-square"
              : aspect === "video"
              ? "aspect-video"
              : "aspect-auto"
          )}
          `}
          width="0"
          height="0"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}
