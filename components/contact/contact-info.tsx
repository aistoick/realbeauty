import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <h3 className="text-2xl font-serif text-primary mb-6">Contact Information</h3>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Address</h4>
                <p className="text-muted-foreground">
                  Buyuk Ipak Yuli 156<br />
                  Tashkent, Uzbekistan
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                <p className="text-muted-foreground">+998 (95) 009-35-56</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground">info@realbeauty.uz</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <h3 className="text-2xl font-serif text-primary mb-6">Follow Us</h3>
          <p className="text-muted-foreground mb-6">
            Stay connected with us on social media for the latest updates, beauty tips, and exclusive offers.
          </p>

          <div className="flex gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/realbeauty_uz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </a>

            {/* Telegram Group */}
            <a
              href="https://t.me/+P2j2y7ScGN0zM2Vi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform bg-transparent"
              >
                {/* Telegram SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9.036 15.58l-.396 5.583c.565 0 .81-.242 1.103-.531l2.647-2.509 5.492 4.029c1.006.557 1.723.263 1.983-.932l3.595-16.878.001-.001c.319-1.482-.526-2.066-1.511-1.701L1.158 9.47c-1.45.562-1.43 1.368-.247 1.728l5.601 1.747L18.73 6.76c.595-.363 1.136-.162.691.201l-10.385 8.62z" />
                </svg>
              </Button>
            </a>

            {/* Telegram Admin */}
            <a
              href="https://t.me/realbeauty_admin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform bg-transparent"
              >
                {/* Telegram icon again */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9.036 15.58l-.396 5.583c.565 0 .81-.242 1.103-.531l2.647-2.509 5.492 4.029c1.006.557 1.723.263 1.983-.932l3.595-16.878.001-.001c.319-1.482-.526-2.066-1.511-1.701L1.158 9.47c-1.45.562-1.43 1.368-.247 1.728l5.601 1.747L18.73 6.76c.595-.363 1.136-.162.691.201l-10.385 8.62z" />
                </svg>
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
