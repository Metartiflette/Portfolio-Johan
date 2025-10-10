// app/components/global/Footer.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/icons/logo_blanc.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black">
      <div className="mx-auto pb-[14px] pt-[100px] md:pt-[140px] md:pb-[140px]">
        <div className="hidden md:grid grid-cols-3 items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src={Logo}
              width={80}
              height={80}
              alt="Logo"
              className="hover:opacity-80 transition-opacity"
            />
            <p className="font-extralight text-[16px]">Johan Vuillerme</p>
          </Link>

          <div className="flex flex-col gap-6 justify-center text-2xl">
            <Link
              href="/privacy"
              className="hover:opacity-80 transition-opacity text-center"
            >
              Privacy Notice
            </Link>
            <Link
              href="https://fr.linkedin.com/in/johan-vuillerme"
              className="hover:opacity-80 transition-opacity text-center"
            >
              Contact Me
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:opacity-80 transition-opacity text-center underline"
            >
              Go back to the top
            </button>
          </div>

          <p className="font-light text-[10px] text-center">
            © Johan Vuillerme {new Date().getFullYear()}
          </p>
        </div>

        <div className="md:hidden flex flex-col gap-20 items-center">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src={Logo}
              width={80}
              height={80}
              alt="Logo"
              className="hover:opacity-80 transition-opacity"
            />
            <p className="font-extralight text-[16px]">Johan Vuillerme</p>
          </Link>

          <div className="flex flex-col gap-6 items-center text-[16px]">
            <Link
              href="/privacy"
              className="hover:opacity-80 transition-opacity text-center"
            >
              Privacy Notice
            </Link>
            <Link
              href="https://fr.linkedin.com/in/johan-vuillerme"
              className="hover:opacity-80 transition-opacity text-center"
            >
              Contact Me
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:opacity-80 transition-opacity text-center underline"
            >
              Go back to the top
            </button>
          </div>

          <p className="font-light text-[10px] text-center">
            © Johan Vuillerme {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}