const skills = [
  { 
    name: "Adobe Photoshop", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
  },
  { 
    name: "Canva", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Canva_Logo.svg/500px-Canva_Logo.svg.png"
  },
  { 
    name: "Adobe Illustrator", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
  },
  { 
    name: "Adobe Premiere Pro", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg"
  },
];

const Skills = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Design Tools I Use
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Professional design software to create stunning visuals and bring your ideas to life.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <img 
                src={skill.logo} 
                alt={skill.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <span className="font-semibold text-foreground text-center text-sm md:text-base">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;