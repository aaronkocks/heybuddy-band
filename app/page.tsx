import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Hero Section with Logo */}
      <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl w-full">
        {/* Large Logo - You'll need to add logo.svg to public folder */}
        <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
          {/* Placeholder - replace with actual logo */}
          <div className="relative w-full h-full flex items-center justify-center y2k-glow rounded-3xl overflow-hidden bg-gradient-to-br from-primary-dark to-primary">
            <h1 className="text-8xl md:text-9xl font-black y2k-text-shadow">
              <span className="text-white">Hey</span>
              <span className="text-primary-light">Buddy</span>
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-center y2k-text-shadow text-primary-light">
          Making noise since whenever
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/shows" className="y2k-button">
            See Shows
          </Link>
          <Link href="/contact" className="y2k-button">
            Book Us
          </Link>
          <a
            href="https://open.spotify.com/artist/heybuddy"
            target="_blank"
            rel="noopener noreferrer"
            className="y2k-button"
          >
            Listen Now
          </a>
        </div>
      </div>
    </div>
  );
}