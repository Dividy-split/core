"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home,
  HelpCircle,
  DollarSign,
  Star,
  Menu,
  X
} from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
}

const sections: Section[] = [
  {
    id: "hero",
    label: "Accueil",
    icon: Home,
  },
  {
    id: "how-it-works",
    label: "Comment ça marche",
    icon: HelpCircle,
  },
  {
    id: "savings",
    label: "Économies",
    icon: DollarSign,
  },
  {
    id: "features",
    label: "Avantages",
    icon: Star,
  },
];

export function HomeSidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "hero");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    // Observer toutes les sections
    const sectionElements = sections.map(section => 
      document.getElementById(section.id) || document.querySelector("section")
    );
    
    sectionElements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionElements.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        let offset = 80; // Offset par défaut
        
        // Pour la section "features", on descend un peu plus bas pour montrer la CTA
        if (sectionId === "features") {
          offset = 10; // Offset négatif réduit davantage
        }
        
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false); // Fermer le menu mobile après navigation
  };

  return (
    <>
      {/* Version Desktop */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <nav className="relative">
          {/* Fil vertical centré par rapport aux bornes */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-300 dark:bg-zinc-600"></div>
          
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <div key={section.id} className="relative flex items-center group">
                  {/* Borne/Point sur le fil */}
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                      "bg-white dark:bg-zinc-900",
                      isActive 
                        ? "border-green-600 bg-green-600 text-white shadow-lg scale-110" 
                        : "border-zinc-300 dark:border-zinc-600 hover:border-green-500 hover:scale-105"
                    )}
                  >
                    <Icon className={cn(
                      "size-3 transition-colors",
                      isActive ? "text-white" : "text-zinc-600 dark:text-zinc-400 group-hover:text-green-600"
                    )} />
                  </button>
                  
                  {/* Label */}
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "ml-4 px-3 py-1 rounded-md text-sm font-medium transition-all duration-300",
                      "opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
                      isActive && "opacity-100 translate-x-0",
                      isActive 
                        ? "bg-green-600 text-white shadow-md" 
                        : "bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                    )}
                  >
                    {section.label}
                  </button>
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Version Mobile */}
      <div className="lg:hidden">
        {/* Bouton flottant */}
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-6 right-6 z-50 size-12 rounded-full shadow-lg bg-green-600 hover:bg-green-700 p-0"
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="fixed bottom-20 right-6 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 shadow-xl min-w-[200px]">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <Button
                    key={section.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full justify-start gap-3 h-10 px-3 relative transition-all",
                      "hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400",
                      isActive && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium"
                    )}
                  >
                    <Icon className="size-4 flex-shrink-0" />
                    <span className="text-sm">{section.label}</span>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-green-600 rounded-full" />
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Overlay pour fermer le menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
}
