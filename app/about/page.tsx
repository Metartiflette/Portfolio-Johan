// app/about/page.tsx

import Image from "next/image";
import { getAbout } from "@/lib/sanity.query";
import { AboutType } from "@/types";
import { PortableText } from "@portabletext/react";

export default async function About() {
  const about: AboutType = await getAbout();

  return (
    <main className="relative min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-6 md:px-12 py-20 md:py-40">
        {/* Profile Images Carousel */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden">
            <Image
              src={about.profileImages[0]?.url}
              alt={about.profileImages[0]?.alt || about.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {about.title}
          </h1>
          <div className="prose prose-invert max-w-none text-base md:text-lg leading-relaxed">
            <PortableText value={about.description} />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="px-6 md:px-12 py-20 md:py-40 border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {about.clientsSection.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center max-w-6xl mx-auto">
          {about.clientsSection.clients?.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-24 md:h-28"
            >
              <Image
                src={client.url}
                alt={client.alt || "Client logo"}
                width={150}
                height={150}
                className="max-w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      {about.sections?.map((section, index) => (
        <section
          key={index}
          className="px-6 md:px-12 py-20 md:py-40 border-t border-gray-800"
        >
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              {section.title}
            </h2>
          )}

          {section.images && section.images.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {section.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative w-full aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || "Section image"}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {section.content && (
            <div className="prose prose-invert max-w-none text-base md:text-lg leading-relaxed">
              <PortableText value={section.content} />
            </div>
          )}
        </section>
      ))}
    </main>
  );
}