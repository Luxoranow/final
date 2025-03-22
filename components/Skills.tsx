export default function Skills() {
  const skillSets = [
    {
      title: "Front-end",
      skills: ["TypeScript", "React", "Vue", "Vuex", "Redux Toolkit", "NextJs", "NuxtJs", "Jest", "GraphQL", "React Native", "Puppeteer", "Enzyme"]
    },
    {
      title: "Styles",
      skills: ["SCSS", "SASS", "PostCSS", "Ant.d", "MUI", "Material UI"]
    },
    {
      title: "Back-end",
      skills: ["Golang", "Gin", "GORM", "PostgreSQL", "MySQL", "MongoDB", "gRPC", "Redis", "Kafka", "Node", "Nest", "TypeORM", "Microservices"]
    },
    {
      title: "DevOps",
      skills: ["Nginx", "Brotli", "Docker", "(CI/CD)", "k8s", "Bash"]
    }
  ];

  const colors = [
    { name: "Black", hex: "#121212" },
    { name: "White", hex: "#F5F5F5" },
    { name: "Light Gray", hex: "#A6A6A6" },
    { name: "Dark Gray", hex: "#303030" }
  ];

  return (
    <section className="py-20 border-t border-border" id="skills">
      <div className="portfolio-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-mono font-bold mb-8">Typography</h2>
            <div className="space-y-8">
              <div>
                <p className="text-muted-foreground mb-4">We use the</p>
                <p className="text-2xl font-mono mb-2">Fira Code</p>
                <p className="text-5xl font-mono font-bold">LUXORA</p>
              </div>
              
              <div className="mt-8">
                <p className="text-2xl font-open-sans mb-2">Open Sans</p>
                <p className="text-5xl font-open-sans font-bold">LUXORA</p>
                <p className="text-muted-foreground mt-4">
                  Fira Code sets the style for our brand in a code-like fashion, while Open Sans ensures the cleanliness and clarity of the text on our website pages.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-mono font-bold mb-8">Colors</h2>
            <p className="text-muted-foreground mb-6">
              For LUXORA, we chose two main colors: <span className="font-bold text-foreground">black and white</span>, accompanied by two shades of gray. These colors highlight professionalism, cleanliness, and status.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              {colors.map((color, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden relative" style={{ backgroundColor: color.hex }}>
                  <div className="absolute bottom-4 left-4 text-sm" style={{ color: color.name === "Black" ? "#F5F5F5" : "#121212" }}>
                    {color.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h2 className="text-3xl font-mono font-bold mb-8">Our Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillSets.map((skillSet, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-mono font-medium mb-4">{skillSet.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillSet.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="text-sm text-muted-foreground">
                      {skill}{skillIndex < skillSet.skills.length - 1 ? " /" : ""}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 