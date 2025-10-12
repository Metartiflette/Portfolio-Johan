"use client";

import Image from "next/image";
import Link from "next/link";
import { ProjectType } from "@/types";

type ProjectCardProps = {
  project: ProjectType;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isFullWidth = index === 0 || index % 3 === 1;
  const isSplitPair = index > 1 && (index % 3 === 2 || index % 3 === 0);

  const heightClass =
    index === 0
      ? "h-screen"
      : "h-[400px] md:h-[500px]";

  const wrapperClass = (() => {
    if (index === 0) return "col-span-2";
    if (isFullWidth) return "col-span-2";
    if (isSplitPair) return "col-span-2 md:col-span-1";
    return "col-span-2";
  })();

  return (
    <Link
      key={project._id}
      href={`/${project.slug}`}
      className={`group relative block overflow-hidden ${wrapperClass}`}
    >
      <div className={`relative ${heightClass} overflow-hidden`}>
        {project.coverMedia?.type === "video" && project.coverMedia.video?.url ? (
          <video
            src={project.coverMedia.video.url}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />
        ) : project.coverMedia?.image?.url ? (
          <Image
            src={project.coverMedia.image.url}
            alt={project.coverMedia.image.alt || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="absolute bottom-0 left-0 p-6 z-10">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-1">{project.title}</h2>
        {project.category && (
          <p className="text-sm text-gray-300">{project.category}</p>
        )}
        {project.tagline && (
          <p className="text-sm text-gray-400 mt-1">{project.tagline}</p>
        )}
      </div>
    </Link>
  );
}
