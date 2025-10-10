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
      "heroImage": heroImage.asset->url,
      featuredProjects[]->{
        _id,
        title,
        "slug": slug.current,
        category,
        tagline,
        coverImage {
          alt,
          "image": asset->url
        }
      },
      ctaTitle,
      "ctaBackgroundImage": ctaBackgroundImage.asset->url,
      ctaButton,
      socialLinks[]{ platform, url }
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
      coverImage {
        alt,
        "image": asset->url
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
      coverImage {
        alt,
        "image": asset->url
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