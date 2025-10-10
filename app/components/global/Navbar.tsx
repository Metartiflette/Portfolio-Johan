// app/components/global/Navbar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/public/icons/JVlogo_Blanc.png";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };

    const navLinks = [
        {
            title: "HOME",
            href: "/",
        },
        {
            title: "ABOUT ME",
            href: "/about",
        },
        {
            title: "CONTACT ME",
            href: "https://fr.linkedin.com/in/johan-vuillerme",
            external: true,
        },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 p-6 pr-[42px] md:p-[42px] md:pr-[76px]">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={Logo}
                            width={100}
                            height={100}
                            alt="Logo"
                            className="hover:opacity-80 transition-opacity"
                        />
                    </Link>

                    <button
                        aria-label="Toggle Menu"
                        onClick={toggleMenu}
                        className="z-40 text-white hover:opacity-80 transition-opacity"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 md:w-[30px] md:h-[30px]" />
                        ) : (
                            <Menu className="w-6 h-6 md:w-[30px] md:h-[30px]" />
                        )}
                    </button>
                </div>

                <nav
                    className={`fixed top-0 right-0 h-screen w-full bg-black z-35 transform transition-transform duration-350 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} flex items-center justify-center`}
                >
                    <div className="flex flex-col gap-8 text-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                onClick={closeMenu}
                                className="text-[32px] md:text-5xl font-bold uppercase text-white hover:underline"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </nav>
            </header>
        </>
    );
}