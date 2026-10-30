// components/NegotiationGuideBox.tsx

// >>> HIER SPÄTER DEINEN CHECKOUT-LINK EINTRAGEN (Digistore24, Gumroad, Stripe ...) <<<
const CHECKOUT_URL = "https://mindguide8.gumroad.com/l/zgeyl?wanted=true";

const BENEFITS: Array<{ title: string; text: string }> = [
  {
    title: "E-Mail-Vorlagen",
    text: "Fertige Texte für Gehaltsanfrage, Nachverhandlung und Gegenangebot.",
  },
  {
    title: "Verhandlungs-Skripte",
    text: "Wortgenaue Formulierungen für das Gespräch, auch für schwierige Momente.",
  },
  {
    title: "Branchen-Benchmarks",
    text: "Realistische Gehaltsspannen, damit du mit Zahlen argumentierst.",
  },
  {
    title: "Schritt-für-Schritt-Checkliste",
    text: "Von der Vorbereitung bis zur Zusage, nichts bleibt dem Zufall überlassen.",
  },
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 flex-none text-emerald-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface NegotiationGuideBoxProps {
  href?: string;
  className?: string;
}

export default function NegotiationGuideBox({
  href = CHECKOUT_URL,
  className = "",
}: NegotiationGuideBoxProps) {
  return (
    <section
      aria-labelledby="negotiation-guide-heading"
      className={
        "relative my-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-2xl ring-1 ring-white/10 sm:p-10 " +
        className
      }
    >
      {/* Dekorative Lichtflecken */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 lg:grid-cols-5 lg:items-center">
        {/* Linke Seite: Text und Benefits */}
        <div className="lg:col-span-3">
          <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
            Dein nächster Schritt
          </span>

          <h2
            id="negotiation-guide-heading"
            className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl"
          >
            Hole bis zu 10.000 € mehr bei deiner nächsten Gehaltsverhandlung
            raus
          </h2>

          <p className="mt-3 text-base text-slate-300">
            Du kennst jetzt dein Marktgehalt. Mit dem{" "}
            <strong className="font-semibold text-white">
              AI Salary &amp; Negotiation Guide 2026
            </strong>{" "}
            setzt du es auch durch.
          </p>

          <ul className="mt-6 space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit.title} className="flex gap-3">
                <CheckIcon />
                <span className="text-sm text-slate-300 sm:text-base">
                  <strong className="font-semibold text-white">
                    {benefit.title}:
                  </strong>{" "}
                  {benefit.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rechte Seite: Angebots-Karte mit Button */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 backdrop-blur">
            <p className="text-sm font-medium text-slate-400">
              AI Salary &amp; Negotiation Guide 2026
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Digitales Produkt, sofort als Download verfügbar
            </p>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-4 text-base font-bold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02] hover:from-emerald-300 hover:to-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
            >
              Verhandlungs-Guide sichern
              <svg
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <ul className="mt-4 space-y-1 text-xs text-slate-400">
              <li>Sichere Zahlung beim Anbieter</li>
              <li>Sofortiger Zugriff nach dem Kauf</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}