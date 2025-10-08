// types/index.ts

import { PortableTextBlock } from "@portabletext/react";

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

export type HomeType = {
  _id: string;
  title: string;
  heroTitle: string;
  heroTagline?: string;
  featuredProjects: ProjectType[];
  ctaTitle?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    other?: string;
  };
};