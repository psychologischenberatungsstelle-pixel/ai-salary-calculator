import React from "react";

export default function ImpressumPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Impressum / Legal Notice</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Angaben gemäß EU-E-Commerce-Richtlinie / DDG / ECG / Schweizer UWG</h2>
        <p><strong>Diensteanbieter / Platform Operator:</strong> [Dein Name / Firmenname]</p>
        <p><strong>Anschrift / Address:</strong> [Straße, Hausnummer, PLZ, Ort, Land]</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Kontakt / Contact</h2>
        <p><strong>E-Mail:</strong> [Deine E-Mail-Adresse]</p>
        <p><strong>Website:</strong> https://ai-salary-calculator.vercel.app</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Umsatzsteuer-ID / VAT Identification</h2>
        <p>[Falls vorhanden eintragen, sonst: Nicht umsatzsteuerpflichtig / Entfällt]</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">EU-Streitschlichtung / Online Dispute Resolution</h2>
        <p className="text-sm text-gray-600">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
            https://ec.europa.eu/consumers/odr/
          </a>.
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </main>
  );
}