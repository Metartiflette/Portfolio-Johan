// lib/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getHome() {
  return client.fetch(
    groq`*[_type == "home"][0]{
      _id,
      title,
      heroTitle,
      heroTagline,
      ctaTitle,
      "ctaBackgroundImage": ctaBackgroundImage.asset->url,
      ctaButton {
        label,
        url
      },
      featuredProjects[]->{
        _id,
        title,
        "slug": slug.current,
        category,
        tagline,
        coverMedia {
          type,
          image {
            alt,
            "url": asset->url
          },
          video {
            "url": asset->url
          }
        },
        order
      },
      socialLinks[] {
        platform,
        url,
        customIcon {
          "url": asset->url,
          alt
        }
      }
    }`
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"] | order(order asc, _createdAt desc){
      _id,
      title,
      "slug": slug.current,
      category,
      tagline,
      coverMedia {
        type,
        image {
          alt,
          "url": asset->url
        },
        video {
          "url": asset->url
        }
      },
      order
    }`
  );
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      category,
      tagline,
      description,
      coverMedia {
        type,
        image {
          alt,
          "url": asset->url
        },
        video {
          "url": asset->url
        }
      },
      credits[] {
        role,
        name
      },
      tools[] {
        name,
        icon {
          "image": asset->url,
          alt
        }
      },
      gallery[] {
        "image": asset->url,
        alt,
        caption
      }
    }`,
    { slug }
  );
}