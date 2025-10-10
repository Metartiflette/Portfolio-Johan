// types/index.ts

import { PortableTextBlock } from "@portabletext/react";

export type SocialLinkType = {
  platform: "linktree" | "instagram" | "linkedin" | "twitter" | "facebook" | "other";
  url: string;
  customIcon?: {
    url: string;
    alt?: string | null;
  };
};

export type HomeType = {
  _id: string;
  title: string;
  heroTitle: string;
  heroTagline?: string;
  featuredProjects: ProjectType[];
  ctaTitle: string;
  ctaBackgroundImage: string;
  ctaButton?: { label: string; url: string };
  socialLinks: SocialLinkType[];
};

export type ProjectType = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  tagline?: string;
  coverMedia: {
    type: "image" | "video";
    image?: {
      alt?: string | null;
      url?: string;
    };
    video?: {
      url?: string;
    };
  };
  description?: PortableTextBlock[];
  credits?: {
    role: string;
    name: string;
  }[];
  tools?: {
    name: string;
    icon?: {
      image: string;
      alt?: string | null;
    };
  }[];
  gallery?: {
    image: string;
    alt?: string | null;
    caption?: string;
  }[];
  order?: number;
};