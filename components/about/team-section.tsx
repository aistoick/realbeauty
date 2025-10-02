import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Isabella Martinez",
    role: "Founder & CEO",
    bio: "Passionate about natural beauty and sustainability, Isabella founded Real Beauty to celebrate authentic femininity.",
    image: "/founder-portrait-natural-beauty.jpg",
    social: {
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "Sophie Chen",
    role: "Head of Product Development",
    bio: "With 10+ years in cosmetic chemistry, Sophie ensures every formula meets our high standards for quality and safety.",
    image: "/team-member-sophie-chen.jpg",
    social: {
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "Emma Thompson",
    role: "Creative Director",
    bio: "Emma brings our brand vision to life through stunning packaging design and creative campaigns that inspire.",
    image: "/team-member-emma-thompson.jpg",
    social: {
      linkedin: "#",
      instagram: "#",
    },
  },
]

export function TeamSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            The passionate women behind Real Beauty, dedicated to bringing you the finest cosmetics
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-pretty">{member.bio}</p>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
