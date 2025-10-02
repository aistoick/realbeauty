import { Calendar, Target, Globe } from "lucide-react"

export function OurStory() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                About Proactive Solutions
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-pretty">
                  Our purpose at Proactive Solutions, as a distributor of skincare products, is to empower individuals
                  to embrace their natural beauty and confidence through high-quality skincare solutions. We are
                  committed to curating and delivering products that not only enhance the health and radiance of the
                  skin but also promote self-care rituals that nurture both the body and the spirit.
                </p>
                <p className="text-pretty">
                  At Proactive Solutions, we envision a world where skincare isn't just a routine, but a transformative
                  experience that empowers individuals to embrace their unique beauty with confidence. We strive to be
                  the leading distributor of skincare products, pioneering innovation and excellence in every service we
                  deliver.
                </p>
                <p className="text-pretty">
                  We're passionate about serving people. So, we commit to build a bridge between K-beauty brands and CIS
                  customers, creating an inspiring way to connect K-Beauty to the world.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">2023 - Foundation Year</h3>
                  <p className="text-sm text-muted-foreground">
                    Start of online e-commerce shop; partnerships with INTERMODA and AIONCOKOREA; 300% sales growth;
                    launch of wholesale channel in Uzbekistan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">2024 - Market Expansion</h3>
                  <p className="text-sm text-muted-foreground">
                    Presence on UZUM Marketplace; partnership with Ronas; launch of offline store
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">2025 - Strategic Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Partnership with 3 new brands; enlarge warehouse; showroom in Tashkent; open 2 new showrooms in
                    other Uzbek regions; expand to neighbor countries; launch Cosmetics Shopping Mall in Tashkent
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="images/Nilufar.jpg"
                alt="Nilufar Safarova - Founder & CEO"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
