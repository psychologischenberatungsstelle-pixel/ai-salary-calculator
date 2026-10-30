"use client";

type Props = {
  jobTitle: string;
  location: string;
};

export default function AffiliateBox({ jobTitle, location }: Props) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        Bereit für die Bewerbung als {jobTitle}?
      </h3>
      <p className="text-sm text-gray-700 mb-4">
        Optimiere deinen Lebenslauf kostenlos mit KI und prüfe die Lesechancen für HR-Scanner (ATS), um dein Zielgehalt in {location} zu sichern.
      </p>
      <div className="space-y-2">
        <a
          href="https://quickcv.io/?atp=c22Csg"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 px-4 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Kostenlosen ATS-Lebenslauf-Check starten →
        </a>

        
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Affiliate links - We may earn a commission
      </p>
      {/* 
        TODO: Replace with actual affiliate links when approved
        LinkedIn Jobs Affiliate: https://partner.linkedin.com
        Glassdoor Affiliate: https://www.glassdoor.com/partners
        Indeed Affiliate: https://indeed.force.com/employerSupport1
      */}
    </div>
  );
}
