import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Target, Handshake, Search, TrendingUp } from "lucide-react"

const values = [
  {
    icon: Handshake,
    title: "Forge Lasting Partnerships",
    description: "Build strong, collaborative partnerships with both established and emerging skincare brands.",
  },
  {
    icon: TrendingUp,
    title: "Champion Brand Visibility",
    description: "Raise the profile and visibility of the skincare brands we represent.",
  },
  {
    icon: Target,
    title: "Expand Brand Reach",
    description: "Introduce exceptional skincare brands to new markets and demographics.",
  },
  {
    icon: Award,
    title: "Drive Sustainable Growth",
    description: "Continuously innovate, adapt to market trends, and optimize operations for efficiency.",
  },
  {
    icon: Users,
    title: "Customer-Centric Approach",
    description: "Advance purchase plans, personalized recommendations, exceptional service.",
  },
  {
    icon: Search,
    title: "Expert Curation",
    description: "Only brands with natural, high-quality ingredients through detailed market research.",
  },
]

export function OurValues() {
  return (
    <section className="py-20 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Goals & Approach
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Why choose us? Innovation at the core, tailored partnership offers, and expert curation guide everything we
            do
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover text-center"
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full mb-4 text-lg font-bold">
                1
              </div>
              <h4 className="font-semibold text-foreground mb-2">Detailed Market Research</h4>
              <p className="text-muted-foreground text-sm">Carefully search for top quality skincare products</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full mb-4 text-lg font-bold">
                2
              </div>
              <h4 className="font-semibold text-foreground mb-2">Partnership Offer</h4>
              <p className="text-muted-foreground text-sm">Tailored plan for brands aligned with values</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full mb-4 text-lg font-bold">
                3
              </div>
              <h4 className="font-semibold text-foreground mb-2">Work in Process</h4>
              <p className="text-muted-foreground text-sm">Start distributing and introducing newly partnered brand</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
