import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function ContactCTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">
              Get In Touch
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Let&apos;s Start a Conversation
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Have questions or ready to explore how we can help your business? Our team is here to
              assist you.
            </p>
            <div className="space-y-2">
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Free initial consultation</span>
              </p>
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Customized proposal within 48 hours</span>
              </p>
              <p className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Flexible engagement options</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button>
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Schedule a Call</Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-square">
            <Image
              src="/placeholder.svg?height=800&width=800"
              alt="Contact us"
              width={800}
              height={800}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
