// app/about/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getAbout } from "@/lib/sanity.query";
import { AboutType } from "@/types";

export default function About() {
  const [about, setAbout] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (error) {
        console.error("Erreur lors du chargement de la page about:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  if (!about) return <div className="flex items-center justify-center min-h-screen">Aucune donnée trouvée</div>;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % about.profileImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + about.profileImages.length) % about.profileImages.length);
  };

  const currentProfileImage = about.profileImages[currentImageIndex];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image Slider */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full aspect-square max-w-md rounded-lg overflow-hidden">
              {currentProfileImage && (
                <Image
                  src={currentProfileImage.url}
                  alt={currentProfileImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Slider Controls */}
            {about.profileImages.length > 1 && (
              <div className="flex gap-4">
                <button
                  onClick={handlePrevImage}
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
                  aria-label="Image précédente"
                >
                  ←
                </button>
                <div className="flex items-center gap-2">
                  {about.profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentImageIndex ? "bg-white" : "bg-gray-600"
                      }`}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextImage}
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
                  aria-label="Image suivante"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Title and Description */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{about.title}</h1>
            <div className="prose prose-invert max-w-none">
              <PortableText value={about.description} />
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{about.clientsSection.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {about.clientsSection.clients.map((client, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={client.url}
                alt={client.alt}
                width={150}
                height={150}
                className="max-w-full h-auto opacity-80 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      {about.sections.map((section, index) => (
        <section
          key={index}
          className="container mx-auto px-4 py-20 md:py-32 border-t border-gray-800"
        >
          {section.title && <h2 className="text-3xl md:text-4xl font-bold mb-12">{section.title}</h2>}

          {section.images && section.images.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {section.images.map((image, imgIndex) => (
                <div key={imgIndex} className="relative w-full aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {section.content && (
            <div className="prose prose-invert max-w-none">
              <PortableText value={section.content} />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}