import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach MACA on Instagram or Telegram, by email, or through the form. We'd love to hear how you'd like to help.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        lede="Whether you want to give, teach, volunteer, send supplies, or just learn more — we'd love to hear from you."
      />

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          {/* Form */}
          <div>
            <h2 className="text-h3">Send a message</h2>
            <ContactForm className="mt-6" />
          </div>

          {/* Channels */}
          <div className="lg:pt-2">
            <h2 className="text-h3">Other ways to reach us</h2>
            <p className="mt-3 text-stone">
              We&apos;re most responsive on Instagram and Telegram.
            </p>
            <SocialLinks variant="dark" showLabels className="mt-5 flex-col items-start gap-2" />

            <div className="mt-8 flex items-start gap-3 rounded-[14px] bg-sand p-5">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-clay-600"
                strokeWidth={1.75}
                aria-hidden
              />
              <div>
                <p className="font-medium text-forest-700">Where we work</p>
                <p className="mt-1 text-sm text-stone">
                  {site.location.region}, {site.location.country}. For the
                  community&apos;s safety, we keep the village&apos;s exact
                  location private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
