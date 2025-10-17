// app/components/IntroClient.tsx

"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type IntroClientProps = {
  children: ReactNode;
};

export default function IntroClient({ children }: IntroClientProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a")) return;

    setFadeOut(true);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <section
      onClick={handleClick}
      className={`fixed inset-0 z-100 cursor-pointer transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </section>
  );
}