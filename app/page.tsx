// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/sanity.query";
import { HomeType } from "@/types";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import { ReactElement } from "react";

export default async function Home() {
  const home: HomeType = await getHome();
  
  const renderIcon = (platform: string) => {
    const icons: Record<string, ReactElement> = {
      instagram: <Instagram size={22} />,
      linkedin: <Linkedin size={22} />,
      twitter: <Twitter size={22} />,
      facebook: <Facebook size={22} />,
    };
    return icons[platform] || null;
  };

  return (
    <main className="relative min-h-screen text-white">
      {/* Hero Section */}
      <section className="absolute inset-0 z-10 h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-2">
            {home.heroTitle}
          </h1>
          {home.heroTagline && (
            <p className="text-lg md:text-2xl">{home.heroTagline}</p>
          )}
      </section>

      {/* Projects Grid */}
      <section className="grid md:grid-cols-3">
        {home.featuredProjects.map((project) => (
          <Link
            key={project._id}
            href={`/${project.slug}`}
            className="group relative block overflow-hidden"
          >
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              {project.coverImage?.image && (
                <Image
                  src={project.coverImage.image}
                  alt={project.coverImage.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <h2 className="text-3xl font-bold uppercase mb-1">{project.title}</h2>
              {project.category && (
                <p className="text-sm text-gray-300">{project.category}</p>
              )}
              {project.tagline && (
                <p className="text-sm text-gray-400 mt-1">{project.tagline}</p>
              )}
            </div>
          </Link>
        ))}
      </section>

      {/* CTA Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src={home.ctaBackgroundImage}
          alt="CTA background"
          fill
          className="object-cover absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-wide">
            {home.ctaTitle}
          </h2>
          {home.ctaButton?.url && (
            <Link
              href={home.ctaButton.url}
              className="inline-block bg-white text-black px-8 py-3 rounded-full uppercase text-sm tracking-wide font-semibold hover:bg-gray-200 transition"
            >
              {home.ctaButton.label}
            </Link>
          )}
          <div className="flex justify-center gap-6 mt-8">
            {home.socialLinks.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition"
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