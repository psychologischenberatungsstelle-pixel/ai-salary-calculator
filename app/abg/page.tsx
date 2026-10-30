import React from "react";

export default function AGBPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Nutzungsbedingungen & Haftungsausschluss / Terms of Use</h1>

      <section className="space-y-2 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <h2 className="text-xl font-semibold text-amber-900">1. Haftungsausschluss für Gehaltsdaten (Disclaimer)</h2>
        <p className="text-sm text-amber-800">
          Sämtliche auf dieser Plattform bereitgestellten Gehaltsangaben, Vergleiche und Berechnungen sind <strong>unverbindliche Richtwerte und Schätzungen</strong>. Wir übernehmen keine Gewähr für die Richtigkeit, Vollständigkeit, Genauigkeit oder Aktualität der Daten. Aus den Angaben können keinerlei rechtliche oder finanzielle Ansprüche abgeleitet werden.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. Internationale Nutzung</h2>
        <p className="text-sm text-gray-600">
          Nutzer greifen auf eigenes Risiko auf diesen Dienst zu. Der Betreiber übernimmt keine Gewähr dafür, dass die Inhalte den lokalen Gesetzen des jeweiligen Aufruflandes außerhalb des Sitzlandes entsprechen.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">3. Anwendbares Recht</h2>
        <p className="text-sm text-gray-600">
          Es gilt das Recht am Sitz des Betreibers, soweit dem keine zwingenden verbraucherschutzrechtlichen Bestimmungen des Wohnsitzlandes des Nutzers entgegenstehen.
        </p>
      </section>
    </main>
  );
}