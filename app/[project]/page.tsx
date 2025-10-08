// app/[project]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getSingleProject } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { HiMenu, HiArrowLeft } from "react-icons/hi";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ project: string }>;
};

interface SanityBlock {
  children?: Array<{
    text?: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project: ProjectType = await getSingleProject(slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
      description: "Ce projet n'existe pas ou a été supprimé.",
    };
  }

  const description =
    Array.isArray(project.description) && project.description.length > 0
      ? (project.description[0] as SanityBlock)?.children?.[0]?.text ||
        project.title
      : project.title;

  return {
    title: `${project.title} | Portfolio`,
    description,
    openGraph: {
      images: project.coverImage?.image ? [project.coverImage.image] : [],
      title: project.title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project: ProjectType = await getSingleProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between bg-black/80 backdrop-blur-sm">
        <Link href="/" className="text-2xl font-bold">
          V
        </Link>
        <button className="text-2xl">
          <HiMenu />
        </button>
      </header>

      <div className="pt-24 px-8 md:px-16 max-w-6xl mx-auto pb-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        {/* Cover Image */}
        {project.coverImage && (
          <div className="relative h-[400px] md:h-[600px] mb-12 rounded-lg overflow-hidden">
            <Image
              src={project.coverImage.image}
              alt={project.coverImage.alt || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">
            {project.title}
          </h1>
          {project.category && (
            <p className="text-lg text-gray-400 mb-2">{project.category}</p>
          )}
          {project.tagline && (
            <p className="text-xl text-gray-300">{project.tagline}</p>
          )}
        </div>

        {/* Project Description */}
        {project.description && project.description.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">→</span>
              <h2 className="text-2xl font-bold">A few words about the project.</h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={project.description} />
            </div>
          </section>
        )}

        {/* Credits */}
        {project.credits && project.credits.length > 0 && (
          <section className="mb-16">
            <div className="space-y-2">
              {project.credits.map((credit, index) => (
                <div key={index} className="flex gap-2 text-gray-300">
                  <span className="font-semibold">{credit.role}</span>
                  <span>-</span>
                  <span className="uppercase">{credit.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        {project.tools && project.tools.length > 0 && (
          <section className="mb-16">
            <div className="flex gap-6 items-center">
              {project.tools.map((tool, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  {tool.icon && (
                    <div className="relative w-12 h-12 bg-white rounded-lg p-2">
                      <Image
                        src={tool.icon.image}
                        alt={tool.icon.alt || tool.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm text-gray-400">{tool.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Visual vignettes</h2>
            <div className="space-y-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden">
                  <Image
                    src={image.image}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-sm text-gray-300">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}