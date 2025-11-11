import AdminShowsManager from "@/components/AdminShowsManager";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-4xl font-black mb-8 y2k-text-shadow">
        Manage Shows
      </h1>
      <AdminShowsManager />
    </div>
  );
}