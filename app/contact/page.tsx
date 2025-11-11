"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-center mb-6 y2k-text-shadow">
          Contact Us
        </h1>
        <p className="text-center text-primary-light mb-12">
          Want to book us for a show? Have a question? Drop us a line!
        </p>

        <form onSubmit={handleSubmit} className="y2k-card space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black/50 border-2 border-primary/30 focus:border-primary outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-black/50 border-2 border-primary/30 focus:border-primary outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block mb-2 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border-2 border-primary/30 focus:border-primary outline-none transition-colors resize-none"
              placeholder="Tell us about your event, venue, or question..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="y2k-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {/* Status Messages */}
          {status === "success" && (
            <div className="bg-green-500/20 border-2 border-green-500 text-green-400 p-4 rounded-lg text-center">
              Thanks for reaching out! We'll get back to you soon.
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-500/20 border-2 border-red-500 text-red-400 p-4 rounded-lg text-center">
              {errorMessage || "Oops! Something went wrong. Please try again."}
            </div>
          )}
        </form>

        {/* Direct Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400">Or email us directly at:</p>
          <a
            href="mailto:management@heybuddyband.com"
            className="text-primary hover:text-primary-light text-xl font-semibold"
          >
            management@heybuddyband.com
          </a>
        </div>
      </div>
    </div>
  );
}