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
  homeMediaOverride?: boolean;
  coverMedia: {
    type: "image" | "video";
    image?: { alt?: string | null; url?: string };
    video?: { url?: string };
  };
  homeCoverMedia?: {
    type?: "image" | "video";
    image?: { alt?: string | null; url?: string };
    video?: { url?: string };
  };
  description?: PortableTextBlock[];
  gallery?: {
    type: "image" | "video";
    image?: {
      url?: string;
      alt?: string | null;
      caption?: string;
    };
    video?: {
      url?: string;
    };
  }[];
};

export type AboutSectionImageType = {
  url: string;
  alt?: string | null;
};

export type AboutAdditionalSectionType = {
  title?: string;
  images?: AboutSectionImageType[];
  content?: PortableTextBlock[];
};

export type AboutType = {
  _id: string;
  title: string;
  profileImages: {
    url: string;
    alt?: string | null;
  }[];
  description: PortableTextBlock[];
  clientsSection: {
    title: string;
    clients: {
      url: string;
      alt?: string | null;
      clientName?: string;
      link?: string;
    }[];
  };
  sections?: AboutAdditionalSectionType[];
};

export type IntroType = {
  _id: string;
  title: string;
  logoMedia: {
    type: "image" | "video";
    image?: { url?: string; alt?: string | null };
    video?: { url?: string };
  };
  description: PortableTextBlock[];
  backgroundMedia: {
    type: "image" | "video";
    image?: { alt?: string | null; url?: string };
    video?: { url?: string };
  };
  transition?: { url?: string };
  socialLinks?: SocialLinkType[];
};