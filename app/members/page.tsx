import Image from "next/image";

const members = [
  {
    name: "Jason",
    role: "Guitar",
    bio: '"I play guitar because I suck at drums"',
    image: "/jason-band-photo.jpg",
  },
  {
    name: "Aaron",
    role: "Vocals/Guitar",
    bio: '"I don\'t know what to do with my hands."',
    image: "/aaron-band-photo.jpg",
  },
  {
    name: "Ethan",
    role: "Drums",
    bio: '"What\'s a paradiddle?"',
    image: "/ethan-band-photo.jpg",
  },
  {
    name: "Matt",
    role: "Bass",
    bio: '"I just wanted to be different."',
    image: "/matthew-band-photo.jpg",
  },
];

export default function Members() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 y2k-text-shadow">
        Meet the Band
      </h1>

      {/* Cover photo - full band */}
      <div className="relative w-full max-w-5xl mx-auto aspect-video mb-16 rounded-xl overflow-hidden y2k-card">
        <Image
          src="/cover-photo.jpg"
          alt="HeyBuddy band"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {members.map((member) => (
          <div key={member.name} className="y2k-card">
            <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
            <p className="text-primary mb-2">{member.role}</p>
            <p className="text-gray-300">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}