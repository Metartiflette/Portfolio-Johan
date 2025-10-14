// app/[project]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getSingleProject } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ project: string }>;
};

interface SanityBlock {
  children?: Array<{ text?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project: ProjectType = await getSingleProject(slug);

  if (!project) {
    return { title: "Projet non trouvé", description: "Ce projet n'existe pas ou a été supprimé." };
  }

  const description =
    Array.isArray(project.description) && project.description.length > 0
      ? (project.description[0] as SanityBlock)?.children?.[0]?.text || project.title
      : project.title;

  const imageUrl =
    project.coverMedia?.type === "image"
      ? project.coverMedia.image?.url
      : undefined;

  return {
    title: `${project.title} | Portfolio`,
    description,
    openGraph: { images: imageUrl ? [imageUrl] : [], title: project.title, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.project;
  const project: ProjectType = await getSingleProject(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to home
      </Link>

      {/* Cover Media */}
      <div className="relative w-full h-[400px] md:h-[600px] mb-12 rounded-lg overflow-hidden">
        {project.coverMedia?.type === "video" && project.coverMedia.video?.url ? (
          <video
            src={project.coverMedia.video.url}
            className="object-cover w-full h-full"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={project.coverMedia.image?.url || ""}
            alt={project.coverMedia.image?.alt || project.title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">{project.title}</h1>
        {project.category && <p className="text-lg text-gray-400 mb-2">{project.category}</p>}
        {project.tagline && <p className="text-xl text-gray-300">{project.tagline}</p>}
      </div>

      {/* Description */}
      {project.description && (
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

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Visual vignettes</h2>
          <div className="space-y-6">
            {project.gallery.map((item, index) => (
              <div
                key={index}
                className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden"
              >
                {item.type === "video" && item.video?.url ? (
                  <video
                    src={item.video.url}
                    className="object-cover w-full h-full"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || `Gallery item ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : null}

                {(item.image?.caption || item.video?.caption) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-sm text-gray-300">
                      {item.image?.caption || item.video?.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
