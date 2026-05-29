"use client";

import { useState, useEffect } from "react";

const videos = [
    { src: "/img/home/cat_01.mp4", label: "Project 1" },
    { src: "/img/home/cat_02.mp4", label: "Project 2" },
    { src: "/img/home/cat_03.mp4", label: "Project 3" },
];

const VideoCarousel = () => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((i) => (i - 1 + videos.length) % videos.length);
    const next = () => setCurrent((i) => (i + 1) % videos.length);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft")  prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden">

            {/* All videos rendered at once; only the active one is visible */}
            {videos.map((v, i) => (
                <video
                    key={v.src}
                    src={v.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        i === current ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}

            {/* Prev / Next buttons */}
            <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
            >
                ‹
            </button>
            <button
                onClick={next}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
            >
                ›
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {videos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to video ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            i === current ? "bg-white" : "bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoCarousel;