import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Jasur",
    role: "",
    content:
      "Real Beauty has completely transformed my skincare routine. The products are luxurious yet gentle, and I love knowing they're made with natural ingredients.",
    rating: 5,
    avatar: "/professional-woman-portrait.png",
  },
  {
    id: 2,
    name: "Madina",
    role: "Makeup Artist",
    content:
      "As a professional makeup artist, I'm incredibly picky about products. Real Beauty's cosmetics have exceptional quality and staying power. My clients always ask what I'm using!",
    rating: 5,
    avatar: "/asian-woman-professional-portrait.png",
  },
  {
    id: 3,
    name: "Aziz",
    role: "Lifestyle Blogger",
    content:
      "The packaging is gorgeous and the products deliver on their promises. I've been using Real Beauty for months and my skin has never looked better.",
    rating: 5,
    avatar: "/latina-professional-portrait.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Join thousands of women who have discovered their natural beauty with Real Beauty
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 btn-hover"
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
