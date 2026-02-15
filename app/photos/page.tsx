import { supabaseAdmin, Photo } from "@/lib/supabase";
import PhotosGallery from "./PhotosGallery";

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|avif)$/i;

async function getPhotosFromBucket(): Promise<Photo[]> {
  try {
    const { data: files, error } = await supabaseAdmin.storage
      .from("photos")
      .list("", { limit: 1000 });

    if (error) {
      console.error("Error listing photos bucket:", error);
      return [];
    }

    const imageFiles = (files ?? []).filter(
      (f) => !f.name.endsWith("/") && IMAGE_EXT.test(f.name)
    );

    const photos: Photo[] = imageFiles.map((file) => {
      const { data } = supabaseAdmin.storage
        .from("photos")
        .getPublicUrl(file.name);
      return {
        id: file.name,
        url: data.publicUrl,
        caption: undefined,
        created_at: file.created_at ?? new Date().toISOString(),
      };
    });

    // Newest first (by created_at if present, else by name)
    photos.sort((a, b) => {
      const tA = new Date(a.created_at).getTime();
      const tB = new Date(b.created_at).getTime();
      return tB - tA;
    });

    return photos;
  } catch {
    return [];
  }
}

export default async function PhotosPage() {
  const photos = await getPhotosFromBucket();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl md:text-6xl font-black text-center mb-12 y2k-text-shadow">
        Photos
      </h1>

      <PhotosGallery photos={photos} />
    </div>
  );
}