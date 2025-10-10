// app/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/sanity.query";
import { HomeType } from "@/types";

export default async function Home() {
  const home: HomeType = await getHome();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {home.featuredProjects[0]?.coverImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={home.featuredProjects[0].coverImage.image}
              alt={home.featuredProjects[0].coverImage.alt || "Hero image"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            {home.heroTitle}
          </h1>
          {home.heroTagline && (
            <p className="text-lg md:text-xl text-gray-300">
              {home.heroTagline}
            </p>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-8 md:px-16 py-16">
        {home.featuredProjects.map((project, index) => {
          // Skip first project as it's used in hero
          if (index === 0) return null;

          // Determine grid layout based on index
          const isFullWidth = index % 3 === 1;
          const gridClass = isFullWidth ? "col-span-2" : "col-span-1";

          return (
            <Link
              key={project._id}
              href={`/${project.slug}`}
              className={`relative group block ${gridClass} ${
                index > 1 ? "mt-8" : ""
              }`}
            >
              <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                {project.coverImage && (
                  <Image
                    src={project.coverImage.image}
                    alt={project.coverImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 uppercase">
                    {project.title}
                  </h2>
                  {project.category && (
                    <p className="text-sm text-gray-300 mb-1">
                      {project.category}
                    </p>
                  )}
                  {project.tagline && (
                    <p className="text-sm text-gray-400">
                      {project.tagline}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}