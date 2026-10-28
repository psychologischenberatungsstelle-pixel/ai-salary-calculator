"use client";

export default function AdBanner() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-3">Advertisement</p>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-2">
              Google AdSense
            </p>
            <p className="text-sm text-gray-500">
              Banner Placeholder
            </p>
            <p className="text-xs text-gray-400 mt-2">
              (Replace with actual AdSense code)
            </p>
          </div>
        </div>
      </div>
      {/* 
        TODO: Replace with actual Google AdSense code
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
    </div>
  );
}
