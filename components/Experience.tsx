export default function Experience() {
  const experiences = [
    {
      period: "2022 - Present",
      duration: "2+ years",
      company: "LUXORA",
      position: "Full-stack development",
      skills: "React, Vue, Node.js"
    },
    {
      period: "2021 - 2022",
      duration: "1 year",
      company: "Enterprise Solutions",
      position: "Web application development",
      skills: "React, TypeScript"
    },
    {
      period: "2020 - 2021",
      duration: "1 year",
      company: "Digital Innovations",
      position: "Full-stack solutions",
      skills: "JavaScript & Python"
    },
    {
      period: "2018 - 2020",
      duration: "2 years",
      company: "Tech Ventures",
      position: "Software development",
      skills: "JavaScript & Python"
    }
  ];

  return (
    <section className="py-20 border-t border-border" id="experience">
      <div className="portfolio-container">
        <h2 className="section-title">Our Work</h2>
        
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 border-b border-border py-6">
              <div className="text-sm text-muted-foreground space-y-1 mb-4 md:mb-0">
                <p>{exp.period}</p>
                <p>{exp.duration}</p>
              </div>
              
              <div className="font-medium text-lg mb-4 md:mb-0">
                {exp.company}
              </div>
              
              <div className="text-right hidden md:block">
                <p>{exp.position} | <span className="text-muted-foreground">{exp.skills}</span></p>
              </div>
              
              <div className="md:hidden">
                <p>{exp.position} | <span className="text-muted-foreground">{exp.skills}</span></p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-right">
          <p className="text-muted-foreground">Industry experience</p>
          <p className="font-medium">6+ years</p>
        </div>
      </div>
    </section>
  );
} 