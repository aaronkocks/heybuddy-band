import { supabaseAdmin, Photo } from "@/lib/supabase";
import Image from "next/image";

async function getPhotos() {
  const { data: photos, error } = await supabaseAdmin
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching photos:", error);
    return [];
  }

  return photos as Photo[];
}

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl md:text-6xl font-black text-center mb-12 y2k-text-shadow">
        Photos
      </h1>

      {photos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="y2k-card overflow-hidden">
              <div className="relative w-full h-64">
                <Image
                  src={photo.url}
                  alt={photo.caption || "Band photo"}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {photo.caption && (
                <p className="mt-3 text-center text-primary-light">
                  {photo.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <p>No photos yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}