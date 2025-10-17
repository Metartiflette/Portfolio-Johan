// app/intro/page.tsx

import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getIntro } from "@/lib/sanity.query";
import { IntroType } from "@/types";
import IntroClient from "../components/IntroClient";
import LinktreeLogo from "@/public/icons/linktree-logo.png";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

export default async function Intro() {
    const intro: IntroType = await getIntro();

    const renderIcon = (platform: string): ReactElement | null => {
        const icons: Record<string, ReactElement> = {
            linktree: (
                <Image
                    src={LinktreeLogo}
                    alt="Linktree"
                    width={44}
                    height={44}
                    className="object-contain w-6 h-6"
                />
            ),
            instagram: <Instagram className="w-6 h-6" />,
            linkedin: <Linkedin className="w-6 h-6" />,
            twitter: <Twitter className="w-6 h-6" />,
            facebook: <Facebook className="w-6 h-6" />
        };
        return icons[platform] || null;
    };

    return (
        <IntroClient>
            <div className="absolute inset-0 z-0">
                {intro.backgroundMedia.type === "video" &&
                    intro.backgroundMedia.video?.url ? (
                    <video
                        src={intro.backgroundMedia.video.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                ) : (
                    intro.backgroundMedia.image?.url && (
                        <Image
                            src={intro.backgroundMedia.image.url}
                            alt={intro.backgroundMedia.image.alt || "Background"}
                            fill
                            className="object-cover"
                            priority
                        />
                    )
                )}
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <Image
                    src={intro.logo.url}
                    alt={intro.logo.alt || intro.title}
                    width={150}
                    height={150}
                    className="w-24 h-24 md:w-40 md:h-40 object-contain"
                    priority
                />
            </div>

            <div className="absolute bottom-70 right-0 md:bottom-30 md:right-10 z-10 prose prose-invert prose-lg text-white text-center text-2xl md:text-5xl font-thin md:text-right flex md:block items-center justify-center w-full md:w-auto md:h-auto custom-strong">
                <PortableText value={intro.description} />
            </div>

            <div className="absolute bottom-6 w-full z-10">
                {intro.socialLinks && intro.socialLinks.length > 0 && (
                    <>
                        <div className="flex justify-center gap-5">
                            {intro.socialLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:opacity-80 transition-opacity"
                                >
                                    {link.platform === "other" && link.customIcon?.url ? (
                                        <Image
                                            src={link.customIcon.url}
                                            alt={link.customIcon.alt || "Social icon"}
                                            width={44}
                                            height={44}
                                            className="w-6 h-6 object-contain"
                                        />
                                    ) : (
                                        renderIcon(link.platform)
                                    )}
                                </Link>
                            ))}
                        </div>
                        <p className="font-light text-[12px] text-center mt-3">
                            © Johan Vuillerme {new Date().getFullYear()}
                        </p>
                    </>
                )}
            </div>
        </IntroClient>
    );
}