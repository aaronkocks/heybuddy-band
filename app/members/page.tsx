const members = [
    {
      name: "Aaron",
      role: "Vocals / Rhythm Guitar",
      description:
        "The voice of HeyBuddy with a knack for catchy hooks and solid rhythm.",
      quirk: "Writes lyrics in grocery store parking lots and refuses to explain why.",
    },
    {
      name: "Ethan",
      role: "Drums",
      description:
        "Keeps the beat steady and adds unexpected fills that make every song pop.",
      quirk:
        "Once brought a cowbell to practice as a joke. It's now in every song.",
    },
    {
      name: "Jason",
      role: "Lead Guitar / Vocals",
      description:
        "Shreds solos and harmonizes like nobody's business. Dual threat.",
      quirk: "Collects guitar picks but only uses the same one from 2019.",
    },
    {
      name: "Matthew",
      role: "Bass",
      description:
        "Lays down the low end that holds everything together with style.",
      quirk: "Plays bass with his eyes closed. We're not sure if it's skill or confidence.",
    },
  ];
  
  export default function MembersPage() {
    return (
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4 y2k-text-shadow">
            Meet the Band
          </h1>
          <p className="text-xl text-primary-light max-w-3xl mx-auto">
            Four friends making music that's equal parts chaos and chemistry.
            We're HeyBuddy, and we're here to have a good time.
          </p>
        </div>
  
        {/* Members Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {members.map((member, index) => (
            <div key={index} className="y2k-card hover:scale-105 transition-all">
              {/* Member Photo Placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-primary-dark to-primary rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl font-black text-white/20">
                  {member.name[0]}
                </span>
              </div>
  
              {/* Member Info */}
              <h2 className="text-3xl font-bold mb-2 y2k-text-shadow">
                {member.name}
              </h2>
              <p className="text-primary-light font-semibold mb-3">
                {member.role}
              </p>
              <p className="text-gray-300 mb-4">{member.description}</p>
  
              {/* Quirky Quote */}
              <div className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
                <p className="text-sm italic text-primary-light">
                  "{member.quirk}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }