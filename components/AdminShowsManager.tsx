"use client";

import { useState, useEffect } from "react";
import { supabase, Show } from "@/lib/supabase";
import { Trash2, Plus } from "lucide-react";

export default function AdminShowsManager() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: "",
    venue: "",
    city: "",
    state: "",
    ticket_link: "",
  });

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    const { data, error } = await supabase
      .from("shows")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error loading shows:", error);
    } else {
      setShows(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("shows").insert([formData]);

    if (error) {
      alert("Error adding show: " + error.message);
    } else {
      setFormData({
        date: "",
        venue: "",
        city: "",
        state: "",
        ticket_link: "",
      });
      loadShows();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this show?")) return;

    const { error } = await supabase.from("shows").delete().eq("id", id);

    if (error) {
      alert("Error deleting show: " + error.message);
    } else {
      loadShows();
    }
  };

  if (loading) return <p>Loading shows...</p>;

  return (
    <div className="space-y-8">
      {/* Add Show Form */}
      <div className="y2k-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Plus size={24} />
          Add New Show
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Date & Time</label>
              <input
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-black/50 border-2 border-primary/30 focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Venue</label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-black/50 border-2 border-primary/30 focus:border-primary outline-none"
                placeholder="Venue Name"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-black/50 border-2 border-primary/30 focus:border-primary outline-none"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                State (Optional)
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-black/50 border-2 border-primary/30 focus:border-primary outline-none"
                placeholder="State/Province"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Ticket Link (Optional)
            </label>
            <input
              type="url"
              value={formData.ticket_link}
              onChange={(e) =>
                setFormData({ ...formData, ticket_link: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-black/50 border-2 border-primary/30 focus:border-primary outline-none"
              placeholder="https://..."
            />
          </div>

          <button type="submit" className="y2k-button">
            Add Show
          </button>
        </form>
      </div>

      {/* Shows List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">All Shows</h2>
        <div className="space-y-4">
          {shows.map((show) => (
            <div key={show.id} className="y2k-card flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{show.venue}</h3>
                <p className="text-primary-light">
                  {show.city}
                  {show.state && `, ${show.state}`}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(show.date).toLocaleString()}
                </p>
                {show.ticket_link && (
                  <a
                    href={show.ticket_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View Tickets
                  </a>
                )}
              </div>
              <button
                onClick={() => handleDelete(show.id)}
                className="text-red-500 hover:text-red-400 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}