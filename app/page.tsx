import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 md:py-12">
      <div className="flex flex-col items-center w-full max-w-5xl gap-10 md:gap-14">
        {/* Hero: Logo + Tagline */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative w-full max-w-2xl aspect-square">
            <Image
              src="/band-photo.jpg"
              alt="HeyBuddy band"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-2xl md:text-3xl text-center y2k-text-shadow text-primary-light">
            Making noise since whenever
          </p>
        </div>

        {/* Bio + Buttons: equal weight side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 w-full items-start">
          {/* Bio */}
          <div className="md:pr-4 flex flex-col justify-center">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center md:text-left">
              A four-member family cover band, HeyBuddy started as a way for us to
              connect with each other. Our first shows were in the family
              basement, performing for nobody except our annoyed family upstairs.
              We figured sharing is caring, and now we annoy people on bigger
              stages, with a bigger sound, bigger puns, and the worst dad jokes.
              Come see us live, it&apos;s family time!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start md:flex-col md:items-stretch">
            <Link href="/shows" className="y2k-button text-center">
              See Shows
            </Link>
            <Link href="/contact" className="y2k-button text-center">
              Book Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}