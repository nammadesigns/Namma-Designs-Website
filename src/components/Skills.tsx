import { Progress } from "./ui/progress";

const skills = [
  { name: "Adobe Photoshop", level: 95 },
  { name: "Adobe Illustrator", level: 90 },
  { name: "Figma", level: 85 },
  { name: "Canva", level: 95 },
  { name: "CorelDRAW", level: 80 },
  { name: "Adobe InDesign", level: 85 },
];

const Skills = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          My Design Skills
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Proficient in industry-leading design tools to bring your vision to life with precision and creativity.
        </p>
        
        <div className="space-y-8">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">{skill.name}</span>
                <span className="text-primary font-bold">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;