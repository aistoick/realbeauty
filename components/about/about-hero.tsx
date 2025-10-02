import { Sparkles } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative py-20 gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 opacity-20 butterfly-float">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-15 butterfly-float" style={{ animationDelay: "1s" }}>
        <Sparkles className="h-6 w-6 text-primary" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Proactive Solutions
            <span className="block text-primary">Pro Actions for a Happier Life!</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Wholesaler & Retailer - Distributor of K-Beauty Brands to CIS Countries. We aim to become No.1 distributor
            of Korean Skincare Products to CIS countries with quality service, innovation and unique customer
            experience.
          </p>
        </div>
      </div>
    </section>
  )
}
