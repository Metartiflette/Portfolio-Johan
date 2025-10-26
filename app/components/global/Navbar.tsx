// app/components/global/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/public/icons/logo_blanc.png";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const [center, setCenter] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const navLinks = [
        { title: "HOME", href: "/" },
        { title: "ABOUT ME", href: "/about" },
        { title: "CONTACT ME", href: "mailto:lla.vuillerme.johan@gmail.com", external: true },
    ];

    const updateCenter = () => {
        const el = btnRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };

    useEffect(() => {
        updateCenter();
        const onResize = () => updateCenter();
        window.addEventListener("resize", onResize);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("keydown", onKey);
        };
    }, []);

    const toggleMenu = () => {
        if (!isOpen) updateCenter();
        setIsOpen((v) => !v);
    };
    const closeMenu = () => setIsOpen(false);

    const radius = isOpen ? "150vmax" : "0px";
    const clip = `circle(${radius} at ${center.x}px ${center.y}px)`;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[60] p-6 pr-[42px] md:p-[42px] md:pr-[76px]">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center" onClick={closeMenu}>
                        <Image
                            src={Logo}
                            width={100}
                            height={100}
                            alt="Logo"
                            className="hover:opacity-80 transition-opacity"
                        />
                    </Link>

                    <button
                        ref={btnRef}
                        aria-label="Toggle Menu"
                        aria-expanded={isOpen}
                        onClick={toggleMenu}
                        className="z-[70] text-white hover:opacity-80 transition-opacity"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 md:w-[30px] md:h-[30px]" />
                        ) : (
                            <Menu className="w-6 h-6 md:w-[30px] md:h-[30px]" />
                        )}
                    </button>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-[50] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                style={{
                    WebkitClipPath: clip,
                    clipPath: clip,
                    transition:
                        "clip-path 700ms cubic-bezier(0.83,0,0.17,1), -webkit-clip-path 700ms cubic-bezier(0.83,0,0.17,1)",
                }}
            >
                <div className="absolute inset-0 bg-black/95" />

                <nav className="absolute inset-0 flex items-center justify-center">
                    <ul className="flex flex-col items-center gap-6 md:gap-8">
                        {navLinks.map((link, i) => (
                            <li key={link.title}>
                                <Link
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                    onClick={closeMenu}
                                    className={`text-white uppercase font-bold text-[28px] md:text-5xl tracking-wide transition-all duration-500 hover:underline
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                                    style={{ transitionDelay: isOpen ? `${150 + i * 90}ms` : "0ms" }}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}