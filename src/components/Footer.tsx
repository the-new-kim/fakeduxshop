import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

interface IFooterProps {
  siteTitle: string;
}

export default function Footer({ siteTitle }: IFooterProps) {
  return (
    <footer className="p-5 bg-[rgb(var(--footer-bg))] text-[rgb(var(--background-end-rgb))] flex flex-col w-full min-w-full">
      <div className="flex justify-center items-center text-2xl [&>*]:mx-1 mb-5">
        <FacebookLogo />
        <InstagramLogo />
        <TwitterLogo />
        <YoutubeLogo />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center [&>*]:mx-2 mb-5 md:mb-2">
        <span>Newsletter signup</span>
        <span>About</span>
        <span>Custom care</span>
        <span>Retailer</span>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center [&>*]:mx-3 text-sm font-thin">
        <span>Terms</span>
        <span>Cookies</span>
        <span>Cookie Preferences</span>
        <span>Privacy policy</span>
        <span>
          &copy; {new Date().getFullYear()} {siteTitle}
        </span>
        <span>
          <Link href="https://github.com/the-new-kim/fakestore">Github</Link>
        </span>
      </div>
    </footer>
  );
}
