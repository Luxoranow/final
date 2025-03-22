import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      title: "E-commerce Platform Redesign",
      description: "A complete redesign and development of a high-traffic e-commerce platform using React, Node.js, and MongoDB.",
      image: "/project1.jpg",
      link: "/projects/ecommerce-platform"
    },
    {
      title: "Financial Dashboard Application",
      description: "A responsive financial dashboard with real-time data visualization, built with Vue.js and Express.",
      image: "/project2.jpg",
      link: "/projects/financial-dashboard"
    },
    {
      title: "Healthcare Management System",
      description: "A comprehensive healthcare management solution with secure patient data handling and appointment scheduling.",
      image: "/project3.jpg",
      link: "/projects/healthcare-system"
    }
  ];

  return (
    <section className="py-20 border-t border-border" id="projects">
      <div className="portfolio-container">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-mono font-bold">Featured Projects</h2>
          <Link href="/projects">
            <Button variant="outline" className="rounded-full">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x">
            {projects.map((project, index) => (
              <div key={index} className="min-w-[300px] md:min-w-[400px] snap-start bg-card rounded-lg overflow-hidden flex-shrink-0">
                <div className="aspect-video relative bg-portfolio-gray-dark">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    LUXORA Project
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <Link href={project.link}>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 