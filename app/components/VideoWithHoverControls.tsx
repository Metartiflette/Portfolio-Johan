// app/components/VideoWithHoverControls.tsx

"use client";

import { useState, useRef, useEffect } from "react";

type VideoWithHoverControlsProps = {
    src: string;
    className?: string;
    muted?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    preload?: "auto" | "metadata" | "none";
};

export default function VideoWithHoverControls({
    src,
    className = "",
    muted = true,
    autoPlay = true,
    loop = true,
    playsInline = true,
    preload = "metadata",
}: VideoWithHoverControlsProps) {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // active les controls quand hover
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.controls = hovered;
        }
    }, [hovered]);

    return (
        <div
            className="relative w-full h-full group overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <video
                ref={videoRef}
                src={src}
                muted={muted}
                autoPlay={autoPlay}
                loop={loop}
                playsInline={playsInline}
                preload={preload}
                className={`object-cover w-full h-full ${className}`}
            />

            {/* effet fluide type légende */}
            <div
                className={`absolute z-5 inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 ease-out pointer-events-none
          ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
            </div>
        </div>
    );
}