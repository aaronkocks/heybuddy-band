import { supabaseAdmin, Show } from "@/lib/supabase";

async function getShows() {
  const { data: shows, error } = await supabaseAdmin
    .from("shows")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching shows:", error);
    return [];
  }

  return shows as Show[];
}

export default async function ShowsPage() {
  const shows = await getShows();
  const now = new Date();

  const upcomingShows = shows.filter((show) => new Date(show.date) >= now);
  const pastShows = shows.filter((show) => new Date(show.date) < now);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl md:text-6xl font-black text-center mb-12 y2k-text-shadow">
        Shows
      </h1>

      {/* Upcoming Shows */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Upcoming Shows
        </h2>
        {upcomingShows.length > 0 ? (
          <div className="space-y-4">
            {upcomingShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">
            No upcoming shows scheduled. Check back soon!
          </p>
        )}
      </section>

      {/* Past Shows */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-primary-light">
          Past Shows
        </h2>
        {pastShows.length > 0 ? (
          <div className="space-y-4 opacity-70">
            {pastShows.map((show) => (
              <ShowCard key={show.id} show={show} isPast />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No past shows yet.</p>
        )}
      </section>
    </div>
  );
}

function ShowCard({ show, isPast = false }: { show: Show; isPast?: boolean }) {
  const date = new Date(show.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="y2k-card hover:scale-[1.02] transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold mb-1">{show.venue}</h3>
          <p className="text-primary-light">
            {show.city}
            {show.state && `, ${show.state}`}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {formattedDate} • {formattedTime}
          </p>
        </div>
        {show.ticket_link && !isPast && (
          <a
            href={show.ticket_link}
            target="_blank"
            rel="noopener noreferrer"
            className="y2k-button text-center whitespace-nowrap"
          >
            Get Tickets
          </a>
        )}
      </div>
    </div>
  );
}