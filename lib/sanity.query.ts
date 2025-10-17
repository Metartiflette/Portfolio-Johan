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
        }
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
    groq`*[_type == "project"] | order(_createdAt desc){
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
      }
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
      gallery[] {
        type,
        image {
          "url": asset->url,
          alt,
          caption
        },
        video {
          "url": asset->url,
          caption
        }
      }
    }`,
    { slug }
  );
}

export async function getAbout() {
  return client.fetch(
    groq`*[_type == "about"][0]{
      _id,
      title,
      profileImages[] {
        "url": image.asset->url,
        alt,
      },
      description,
      clientsSection {
        title,
        clients[] {
          "url": logo.asset->url,
          alt,
          clientName,
        },
      },
      sections[] {
        title,
        images[] {
          "url": image.asset->url,
          alt,
        },
        content,
      },
    }`
  );
}

export async function getIntro() {
  return client.fetch(
    groq`*[_type == "intro"][0]{
      _id,
      title,
      logo {
        "url": asset->url,
        alt
      },
      description,
      backgroundMedia {
        type,
        image {
          alt,
          "url": asset->url
        },
        video {
          "url": asset->url
        }
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