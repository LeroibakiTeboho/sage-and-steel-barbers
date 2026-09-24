import Link from "next/link";
import { business } from "@/lib/business";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions, booking policy, cancellation policy and privacy information for Sage & Steel Barber Co., Cape Town.",
};

const LAST_UPDATED = "1 February 2026";

const SECTIONS = [
  {
    id: "appointments",
    title: "1. Appointments and bookings",
    body: [
      `These Terms & Conditions govern all appointments booked with ${business.legalName} ("we", "us", "our"), trading as ${business.fullName} at ${business.fullAddress}.`,
      "Appointments may be made online through this website, by telephone, by WhatsApp, or in person at the shop. Online bookings are provisional until confirmed on screen and, where applicable, by email.",
      "You must be at least 16 years old to make a booking. Bookings for children under 16 must be made by a parent or legal guardian, who accepts these terms on the child's behalf.",
      "We reserve the right to refuse or cancel any booking where we reasonably believe the appointment cannot be safely or appropriately delivered.",
    ],
  },
  {
    id: "pricing",
    title: "2. Services and pricing",
    body: [
      "Prices displayed on this website are in South African Rand (ZAR) and include VAT at the prevailing rate. Prices are correct at the time of booking but may change without prior notice.",
      "The price quoted at the time you complete a booking is the price applicable to that appointment.",
      "Additional services requested during your appointment will be charged at the standard listed price for that service.",
      "We may from time to time run promotions. Promotional pricing cannot be combined with other offers unless expressly stated, and is subject to availability.",
    ],
  },
  {
    id: "payments",
    title: "3. Payment",
    body: [
      "Payment is due in full at the end of your appointment. We accept card and cash payments in-store.",
      "No deposit is required for standard online bookings. For certain extended services or group bookings, we may request a deposit, which will be communicated before the booking is confirmed.",
      "We do not store card details on this website. Any card payments are processed in-store through our payment provider.",
    ],
  },
  {
    id: "cancellations",
    title: "4. Cancellations, rescheduling and no-shows",
    body: [
      "We ask that you give us at least 12 hours' notice if you need to cancel or reschedule your appointment. This gives us a realistic chance of filling the slot.",
      "Cancellations or reschedules made with more than 12 hours' notice are free of charge.",
      "Cancellations or reschedules made with less than 12 hours' notice may, at our discretion, result in a fee of 50% of the booked service value on your next visit.",
      'If you do not arrive for your appointment and do not contact us (a "no-show"), we may require full prepayment for any future bookings.',
      "We will always try to accommodate genuine emergencies. Please contact us and explain the situation.",
      "We reserve the right to cancel or reschedule an appointment in exceptional circumstances. In that case, we will notify you as early as possible and offer a full refund of any deposit paid, or the option to rebook.",
    ],
  },
  {
    id: "late-arrivals",
    title: "5. Late arrivals",
    body: [
      "We hold your appointment for 10 minutes past the scheduled start time. After 10 minutes, we may need to reduce the service or release the slot to another customer.",
      "If we are able to accommodate you after a late arrival, we may still need to shorten the appointment to avoid delaying the customers booked after you. The full service price will still apply.",
      "If we cannot accommodate a late arrival, the appointment will be treated as a late cancellation in terms of section 4.",
    ],
  },
  {
    id: "services-conduct",
    title: "6. Services, results and customer responsibilities",
    body: [
      "We will use reasonable skill and care in delivering all services. Results depend in part on factors outside our control, including hair type, growth patterns, scalp condition and pre-existing damage.",
      "You agree to inform your barber of any known skin conditions, allergies, sensitivities, or scalp or skin injuries before your service begins. Please also tell us if you are using medicated treatments such as retinoids or isotretinoin.",
      "Colour, grey-blending and chemical services carry a small risk of adverse reaction. We will perform a patch test where appropriate and where requested.",
      "We will follow your styling instructions. If you are dissatisfied with the result, please tell us before you leave the shop so we have an opportunity to correct it. Concerns raised after you have left will be assessed on their merits, but corrections are best made immediately.",
      "If you are dissatisfied with any service, please contact us within 7 days at " +
        business.email +
        " and we will review the matter in good faith.",
    ],
  },
  {
    id: "health-safety",
    title: "7. Health, safety and hygiene",
    body: [
      "All tools are sanitised between clients and blades are replaced for every appointment. We follow the hygiene standards expected of a professional barbershop.",
      "We reserve the right to decline service where we reasonably believe that providing it would pose a health or safety risk to you, our staff, or other customers.",
      "Please reschedule your appointment if you are unwell, particularly if you have a contagious condition. There is no cancellation fee for illness-related cancellations made before your appointment.",
    ],
  },
  {
    id: "website",
    title: "8. Website use",
    body: [
      "This website is provided for information and booking purposes. While we work to keep information accurate and up to date, service listings, prices and opening hours may change without notice.",
      "The booking system on this website operates in your browser. Your appointment details are used to generate the confirmation screen and calendar event. We do not create a customer account and we do not store your booking on a server as part of this website's booking flow.",
      "You agree not to misuse this website, including attempting to disrupt its operation, submitting false bookings, or accessing any part of it that is not intended to be public.",
    ],
  },
  {
    id: "privacy",
    title: "9. Privacy and your information",
    body: [
      "We collect only the information needed to deliver your appointment: your name, email address, mobile number, chosen service, chosen barber, appointment date and time, and any notes you provide.",
      "On this website, your booking details are processed in your browser and stored temporarily in your browser's session storage so that a page refresh does not lose your progress. This data is cleared when you close your browser session, or when you complete a booking.",
      "Your booking details are used to generate your appointment confirmation and the calendar event you choose to download or add to Google Calendar. We do not sell, rent or share your personal information with third parties for marketing purposes.",
      'When you use the "Add to Google Calendar" action, your appointment details are passed to Google in the generated calendar link. Google\'s own privacy policy governs that service. When you download an .ics file, the file is generated entirely on your device.',
      "You may request access to, correction of, or deletion of any personal information we hold about you by contacting us at " +
        business.email +
        ". We will respond within a reasonable period and in line with the Protection of Personal Information Act, 2013 (POPIA).",
      "Our premises may be monitored by security cameras for the safety of staff and customers. Footage is retained only for as long as reasonably necessary for that purpose.",
    ],
  },
  {
    id: "liability",
    title: "10. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, our liability arising out of or in connection with any appointment is limited to the value of the service purchased for that appointment.",
      "Nothing in these terms limits any rights you may have under the Consumer Protection Act, 68 of 2008, or any other applicable South African law that cannot be excluded or limited.",
      "We are not liable for loss or damage to personal property left unattended in the shop, except where caused by our negligence.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to these terms",
    body: [
      "We may update these Terms & Conditions from time to time to reflect changes in our services, our booking process, or applicable law.",
      `The version published on this page is the version in force. This version was last updated on ${LAST_UPDATED}.`,
      "The terms applicable to your appointment are the terms published at the time you made your booking. Continued use of the website after an update constitutes acceptance of the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact us",
    body: [
      "If you have any questions about these terms, your booking, or how we handle your information, please contact us:",
    ],
    contact: true,
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink pb-14 pt-32 text-cream sm:pb-16 sm:pt-40">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[0.72rem] text-cream/45">
              <li>
                <Link href="/" className="transition-colors hover:text-mint">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-cream/75">Terms &amp; Conditions</li>
            </ol>
          </nav>

          <h1 className="max-w-3xl text-[clamp(2rem,6vw,3.5rem)] text-cream">
            Terms &amp; Conditions
          </h1>

          <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-cream/65">
            The rules that apply when you book an appointment with{" "}
            {business.fullName}. Written in plain language, because there&apos;s
            no reason for it not to be.
          </p>

          <p className="mt-4 text-[0.75rem] text-cream/40">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
          {/* Contents */}
          <nav
            aria-label="Contents"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Contents
            </h2>
            <ul className="mt-4 space-y-1.5 border-l border-ink/10 pl-4">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block py-1 text-[0.8rem] leading-snug text-ink/60 transition-colors hover:text-teal-700"
                  >
                    {section.title.replace(/^\d+\.\s/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Body */}
          <div className="max-w-3xl">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-ink/10 py-8 first:pt-0 last:border-0"
              >
                <h2 className="font-display text-xl text-ink sm:text-2xl">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-3.5">
                  {section.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[0.87rem] leading-relaxed text-ink/70 sm:text-[0.92rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.contact && (
                  <address className="mt-5 not-italic">
                    <dl className="grid gap-2 rounded-2xl border border-ink/10 bg-white/60 p-5 text-[0.85rem] sm:grid-cols-2">
                      <div>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-clay">
                          Trading name
                        </dt>
                        <dd className="mt-1 text-ink/80">
                          {business.fullName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-clay">
                          Registered entity
                        </dt>
                        <dd className="mt-1 text-ink/80">
                          {business.legalName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-clay">
                          Address
                        </dt>
                        <dd className="mt-1 text-ink/80">
                          {business.fullAddress}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-clay">
                          Phone
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={business.phoneHref}
                            className="text-ink/80 transition-colors hover:text-teal-700"
                          >
                            {business.phone}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-clay">
                          Email
                        </dt>
                        <dd className="mt-1">
                          <a
                            href={business.emailHref}
                            className="break-all text-ink/80 transition-colors hover:text-teal-700"
                          >
                            {business.email}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-clay">
                          Hours
                        </dt>
                        <dd className="mt-1 text-ink/80">
                          Mon–Sat, see{" "}
                          <Link
                            href="/contact"
                            className="text-teal-700 underline underline-offset-2"
                          >
                            contact page
                          </Link>
                        </dd>
                      </div>
                    </dl>
                  </address>
                )}
              </section>
            ))}

            <div className="mt-10 rounded-2xl border border-teal/25 bg-teal/[0.07] p-5 sm:p-6">
              <h2 className="font-display text-lg text-ink">Ready to book?</h2>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink/65">
                By making a booking you confirm that you have read and agree to
                these Terms &amp; Conditions.
              </p>
              <Link
                href="/booking"
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-ink px-5 py-2.5 text-[0.82rem] font-semibold text-cream transition-colors hover:bg-ink-800"
              >
                Book an appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
