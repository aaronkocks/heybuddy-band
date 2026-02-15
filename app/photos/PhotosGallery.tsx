"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/supabase";

const AUTO_ADVANCE_MS = 5000;

export default function PhotosGallery({ photos }: { photos: Photo[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLElement>(null);

  // Start carousel at a random photo
  useEffect(() => {
    if (photos.length > 0) {
      setCurrentIndex(Math.floor(Math.random() * photos.length));
    }
  }, [photos.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % photos.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    carouselRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (photos.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>No photos yet. Check back soon!</p>
      </div>
    );
  }

  const current = photos[currentIndex];

  return (
    <div className="space-y-12">
      {/* Carousel */}
      <section ref={carouselRef} className="w-full">
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] rounded-xl overflow-hidden y2k-card bg-black/40">
          <Image
            src={current.url}
            alt={current.caption || "Band photo"}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
          {current.caption && (
            <p className="absolute bottom-0 left-0 right-0 py-3 px-4 text-center text-primary-light text-sm bg-black/60">
              {current.caption}
            </p>
          )}
        </div>

        {photos.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((i) => (i - 1 + photos.length) % photos.length)
              }
              className="y2k-button py-2 px-4 text-sm"
              aria-label="Previous photo"
            >
              Previous
            </button>
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => setCurrentIndex((i) => (i + 1) % photos.length)}
              className="y2k-button py-2 px-4 text-sm"
              aria-label="Next photo"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Tiled album grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-primary-light">
          Album
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => goTo(index)}
              className={`y2k-card overflow-hidden text-left transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                index === currentIndex ? "ring-2 ring-primary scale-[1.02]" : ""
              }`}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={photo.url}
                  alt={photo.caption || "Band photo"}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              {photo.caption && (
                <p className="mt-2 px-2 pb-2 text-center text-primary-light text-sm line-clamp-2">
                  {photo.caption}
                </p>
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
