"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Jasur",
    role: "",
    content:
      "Real Beauty mahsulotlari mening teri parvarishimni butunlay o‘zgartirdi. Tabiiy ingredientlardan tayyorlanganini bilish yoqimli.",
    avatar: "/professional-woman-portrait.png",
  },
  {
    id: 2,
    name: "Madina",
    role: "Makeup Artist",
    content:
      "Professional vizajist sifatida mahsulotlarda juda talabchanman. Real Beauty kosmetikasi sifati va bardoshliligi bilan ajralib turadi.",
    avatar: "/asian-woman-professional-portrait.png",
  },
  {
    id: 3,
    name: "Aziz",
    role: "Lifestyle Blogger",
    content:
      "Qadoqlanishi juda chiroyli va mahsulotlar haqiqatan ham va’da qilgan natijani beradi. Teri holatim sezilarli darajada yaxshilandi.",
    avatar: "/latina-professional-portrait.png",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fikrlar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real Beauty bilan tabiiy go‘zalligini kashf etgan minglab ayollarga qo‘shiling
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex justify-end mb-4">
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    {testimonial.role && (
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
