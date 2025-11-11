"use client";

import { useState, useEffect } from "react";
import { supabase, Photo } from "@/lib/supabase";
import PhotoUpload from "@/components/PhotoUpload";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPhotos = async () => {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading photos:", error);
    } else {
      setPhotos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleDelete = async (photo: Photo) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      // Extract filename from URL
      const urlParts = photo.url.split("/");
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("photos")
        .remove([fileName]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("photos")
        .delete()
        .eq("id", photo.id);

      if (dbError) throw dbError;

      loadPhotos();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete photo");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-black mb-8 y2k-text-shadow">
        Manage Photos
      </h1>

      <div className="space-y-8">
        <PhotoUpload onUploadComplete={loadPhotos} />

        {loading ? (
          <p>Loading photos...</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              All Photos ({photos.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="y2k-card">
                  <div className="relative w-full h-48 mb-3">
                    <Image
                      src={photo.url}
                      alt={photo.caption || "Band photo"}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  {photo.caption && (
                    <p className="text-sm text-primary-light mb-2">
                      {photo.caption}
                    </p>
                  )}
                  <button
                    onClick={() => handleDelete(photo)}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}