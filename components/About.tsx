import Image from 'next/image';

export default function About() {
  const features = [
    {
      title: "Eco-friendly",
      description: "Save trees, flex sustainability"
    },
    {
      title: "Always up-to-date",
      description: "So you never have to say \"oh, that's my old number\""
    },
    {
      title: "Rich media & social links",
      description: "Because one link just isn't enough"
    },
    {
      title: "Enterprise-grade security",
      description: "Your info stays locked down"
    }
  ];

  return (
    <section className="py-20 border-t border-border" id="about">
      <div className="portfolio-container">
        <h2 className="text-3xl font-mono font-bold mb-8">About LUXORA</h2>
        
        <div>
          <p className="text-xl mb-6 max-w-3xl">
            <span className="font-bold">Networking, but without the cringe.</span>
          </p>
          
          <p className="text-muted-foreground mb-8 max-w-3xl">
            LUXORA ditches outdated paper business cards for smart, digital ones that actually keep up with your life. Whether you're grinding solo or running a team, we make staying connected effortless.
          </p>
          
          <p className="text-muted-foreground mb-8 max-w-3xl">
            We're here to modernize networking—because no one wants a dusty pile of business cards sitting in their junk drawer.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {features.map((feature, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-mono font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 