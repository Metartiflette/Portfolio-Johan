// app/components/ProjectCard.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { ProjectType } from "@/types";

type ProjectCardProps = {
  project: ProjectType;
  index: number;
};

const CATEGORY_LABEL: Record<string, string> = {
  photography: "Photography",
  "short-movie": "Short Movie",
  "client-project": "Client project",
  collaboration: "Collaboration",
  "art-project": "Art project",
  drone: "Drone",
  editing: "Editing",
  miscellaneaous: "Miscellaneaous",
};

function labelCategory(value?: string) {
  if (!value) return "";
  return CATEGORY_LABEL[value] ?? value;
}

function pickHomeMedia(p: ProjectType) {
  const media = p.homeMediaOverride ? p.homeCoverMedia ?? p.coverMedia : p.coverMedia;
  if (!media?.type) return p.coverMedia;
  return media;
}

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

  const categoryLabel = labelCategory(project.category);

  const mediaForHome = pickHomeMedia(project);
  const showVideo = mediaForHome?.type === "video" && !!mediaForHome.video?.url;
  const showImage = mediaForHome?.type === "image" && !!mediaForHome.image?.url;

  const imgAlt =
    (mediaForHome?.type === "image" ? mediaForHome.image?.alt : undefined) ||
    project.title;

  return (
    <Link
      key={project._id}
      href={`/${project.slug}`}
      className={`group relative block overflow-hidden ${wrapperClass}`}
    >
      <div className={`relative ${heightClass} overflow-hidden`}>
        {showVideo ? (
          <video
            src={mediaForHome.video!.url}
            className="object-cover w-full h-full transition-transform duration-350 group-hover:scale-101"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />
        ) : showImage ? (
          <Image
            src={mediaForHome.image!.url!}
            alt={imgAlt}
            fill
            className="object-cover transition-transform duration-350 group-hover:scale-101"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="absolute bottom-0 left-0 p-8 z-10">
        <h2 className="text-2xl md:text-4xl font-black uppercase">{project.title}</h2>

        {categoryLabel && (
          <p className="text-[16px] md:text-[28px] font-bold">{categoryLabel}</p>
        )}

        {project.tagline && (
          <p className="text-[12px] md:text-2xl">{project.tagline}</p>
        )}
      </div>
    </Link>
  );
}