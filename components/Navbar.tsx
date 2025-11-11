"use client";

import Link from "next/link";
import { Music, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/heybuddyband",
    icon: Instagram,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/heybuddyband",
    icon: Facebook,
  },
  { name: "Twitter", url: "https://twitter.com/heybuddyband", icon: Twitter },
  { name: "YouTube", url: "https://youtube.com/@heybuddyband", icon: Youtube },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/heybuddy",
    icon: Music,
  },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl font-bold y2k-text-shadow hover:scale-105 transition-transform"
          >
            <span className="text-primary">Hey</span>
            <span className="text-primary-light">Buddy</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/members"
              className="hover:text-primary transition-colors"
            >
              Members
            </Link>
            <Link
              href="/shows"
              className="hover:text-primary transition-colors"
            >
              Shows
            </Link>
            <Link
              href="/photos"
              className="hover:text-primary transition-colors"
            >
              Photos
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center space-x-6 pb-4">
          <Link href="/members" className="text-sm hover:text-primary">
            Members
          </Link>
          <Link href="/shows" className="text-sm hover:text-primary">
            Shows
          </Link>
          <Link href="/photos" className="text-sm hover:text-primary">
            Photos
          </Link>
          <Link href="/contact" className="text-sm hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}