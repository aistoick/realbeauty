import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <h3 className="text-2xl font-serif text-primary mb-6">Contact Information</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Address</h4>
                <p className="text-muted-foreground">
                  123 Beauty Boulevard
                  <br />
                  Cosmetic District, CD 12345
                  <br />
                  Uzbekistan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                <p className="text-muted-foreground">+998 (99) 123-45-67</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email</h4>
                <p className="text-muted-foreground">hello@realbeauty.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <h3 className="text-2xl font-serif text-primary mb-6">Follow Us</h3>
          <p className="text-muted-foreground mb-6">
            Stay connected with us on social media for the latest updates, beauty tips, and exclusive offers.
          </p>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:scale-110 transition-transform bg-transparent"
            >
              <Instagram className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:scale-110 transition-transform bg-transparent"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:scale-110 transition-transform bg-transparent"
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
