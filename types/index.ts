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
    type: "image" | "video";
    image?: {
      url?: string;
      alt?: string | null;
      caption?: string;
    };
    video?: {
      url?: string;
      caption?: string;
    };
  }[];
};

export type ProfileImageType = {
  url: string;
  alt: string;
};

export type ClientType = {
  url: string;
  alt: string;
  clientName: string;
};

export type ClientsSectionType = {
  title: string;
  clients: ClientType[];
};

export type SectionImageType = {
  url: string;
  alt: string;
};

export type AdditionalSectionType = {
  title?: string;
  images?: SectionImageType[];
  content?: PortableTextBlock[];
};

export type AboutType = {
  _id: string;
  title: string;
  profileImages: ProfileImageType[];
  description: PortableTextBlock[];
  clientsSection: ClientsSectionType;
  sections: AdditionalSectionType[];
};