// app/about/page.tsx

import Image from "next/image";
import { getAbout } from "@/lib/sanity.query";
import { AboutType } from "@/types";
import { PortableText } from "@portabletext/react";
import { Carousel } from "../components/ui/carousel";

export default async function About() {
    const about: AboutType = await getAbout();

    return (
        <main className="relative min-h-screen px-6 md:px-12">
            <section className="flex flex-col md:flex-row gap-8 md:gap-12 mt-38 md:mt-46 items-stretch">
                <Carousel
                    slides={about.profileImages.map((img) => ({
                        src: img.url,
                        alt: img.alt ?? undefined,
                    }))}
                    autoPlay
                    autoPlayInterval={10000}
                />

                <div className="w-full h-full">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">{about.title}</h1>
                    <div className="prose prose-invert max-w-none text-base md:text-lg">
                        <PortableText value={about.description} />
                    </div>
                </div>
            </section>

            <section className="mt-12 md:mt-24">
                <h2 className="text-3xl md:text-5xl font-bold text-center">
                    {about.clientsSection.title}
                </h2>

                <div className="mt-6 md:mt-12 flex flex-col md:flex-row flex-wrap gap-8 md:gap-16 items-center justify-center">
                    {about.clientsSection.clients?.map((client, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center h-[60px] md:h-[80px] flex-shrink-0"
                        >
                            <Image
                                src={client.url}
                                alt={client.alt || "Client logo"}
                                width={200}
                                height={120}
                                className="object-contain h-full w-auto max-w-[150px] md:max-w-[250px] opacity-80 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </section>


            {about.sections?.map((section, index) => (
                <section
                    key={index}
                    className="flex flex-col space-y-6 mt-12 md:mt-24"
                >
                    {section.title && (
                        <h2 className="text-3xl md:text-5xl font-bold text-center">
                            {section.title}
                        </h2>
                    )}

                    {section.images && section.images.length > 0 && (
                        <div
                            className={`grid gap-6 mb-12 ${section.images.length === 1
                                ? 'grid-cols-1 max-w-4xl mx-auto'
                                : section.images.length === 2
                                    ? 'grid-cols-1 md:grid-cols-2'
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                }`}
                        >
                            {section.images.map((image, imgIndex) => (
                                <div
                                    key={imgIndex}
                                    className="relative w-full max-h-[600px] rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.alt || `Section image ${imgIndex + 1}`}
                                        fill
                                        className="object-cover w-full h-full transition-transform duration-350 group-hover:scale-101"
                                        loading="lazy"
                                    />
                                    
                                </div>
                            ))}
                        </div>
                    )}

                    {section.content && (
                        <div className="prose prose-invert prose-lg max-w-none">
                            <PortableText value={section.content} />
                        </div>
                    )}
                </section>
            ))}
        </main>
    );
}