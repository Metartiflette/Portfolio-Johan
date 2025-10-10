// types/index.ts

import { PortableTextBlock } from "@portabletext/react";


export type HomeType = {
  _id: string;
  title: string;
  heroTitle: string;
  heroTagline?: string;
  heroImage: string;
  featuredProjects: ProjectType[];
  ctaTitle: string;
  ctaBackgroundImage: string;
  ctaButton?: { label: string; url: string };
  socialLinks: { platform: string; url: string }[];
};

export type ProjectType = {
  _id: string;
  title: string;
  slug: string;
  coverImage: {
    alt: string | null;
    image: string;
  };
  category?: string;
  tagline?: string;
  description?: PortableTextBlock[];
  credits?: {
    role: string;
    name: string;
  }[];
  tools?: {
    name: string;
    icon?: {
      image: string;
      alt: string | null;
    };
  }[];
  gallery?: {
    image: string;
    alt: string | null;
    caption?: string;
  }[];
  order?: number;
};