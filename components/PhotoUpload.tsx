"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload } from "lucide-react";

export default function PhotoUpload({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("photos").getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from("photos")
        .insert([{ url: publicUrl, caption: caption || null }]);

      if (dbError) throw dbError;

      alert("Photo uploaded successfully!");
      setCaption("");
      e.target.value = ""; // Reset file input
      onUploadComplete();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="y2k-card">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Upload size={24} />
        Upload Photo
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">
            Caption (Optional)
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black/50 border-2 border-primary/30 focus:border-primary outline-none"
            placeholder="Add a caption..."
            disabled={uploading}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="w-full px-4 py-2 rounded bg-black/50 border-2 border-primary/30 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-primary-light"
          />
          <p className="text-sm text-gray-400 mt-2">
            Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
          </p>
        </div>

        {uploading && (
          <div className="bg-primary/20 border-2 border-primary p-3 rounded-lg text-center">
            Uploading...
          </div>
        )}
      </div>
    </div>
  );
}