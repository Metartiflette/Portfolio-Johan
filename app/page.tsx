// app/page.tsx
// 
import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/sanity.query";
import { HomeType } from "@/types";
import ProjectCard from "@/app/components/ProjectCard";
import LinktreeLogo from "@/public/icons/linktree-logo.png";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

export default async function Home() {
  const home: HomeType = await getHome();

  const renderIcon = (platform: string) => {
    const icons: Record<string, ReactElement> = {
      linktree: (
        <Image
          src={LinktreeLogo}
          alt="Linktree"
          width={44}
          height={44}
          className="object-contain w-5 h-5 md:w-11 md:h-11"
        />
      ),
      instagram: <Instagram className="w-5 h-5 md:w-11 md:h-11" />,
      linkedin: <Linkedin className="w-5 h-5 md:w-11 md:h-11" />,
      twitter: <Twitter className="w-5 h-5 md:w-11 md:h-11" />,
      facebook: <Facebook className="w-5 h-5 md:w-11 md:h-11" />,
    };
    return icons[platform] || null;
  };

  return (
    <main className="relative min-h-screen text-white">
      <section className="absolute inset-0 z-10 h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase mb-2">
          {home.heroTitle}
        </h1>
        <p className="text-lg md:text-2xl">{home.heroTagline}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2">
        {home.featuredProjects.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </section>

      <section className="relative pt-20 pb-20 md:pt-80 md:pb-80 flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src={home.ctaBackgroundImage}
          alt="CTA background"
          fill
          className="object-cover absolute inset-0 z-0"
        />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-6xl font-black uppercase">
            {home.ctaTitle}
          </h2>
          <div className="flex justify-center gap-5 mt-3 md:mt-11">
            {home.socialLinks?.length > 0 && home.socialLinks.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                {renderIcon(link.platform)}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}