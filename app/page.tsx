import Link from "next/link";
import salariesData from "@/data/salaries.json";
import DashboardStats from "@/components/DashboardStats";
export default function HomePage() {
  const calculators = salariesData.calculators;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            💰 AI Salary Calculator
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Calculate Your Worth in Tech - Free, Accurate, Updated for 2026
          </p>
          <p className="text-lg text-blue-50 max-w-2xl mx-auto">
            Get instant salary estimates for AI Engineers, Data Scientists, and Tech Professionals worldwide. 
            Based on real market data across {calculators.length}+ locations.
          </p>
        </div>
      </header>
<DashboardStats />
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Calculator Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Job Title & Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {calc.jobTitle}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {calc.location}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {calc.metaDescription.slice(0, 100)}...
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Calculate Salary →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Use Our Salary Calculator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Accurate Data</h3>
              <p className="text-gray-600">
                Based on real market data from top tech companies and recruiters
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get your salary estimate in seconds with our interactive calculator
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-gray-600">
                Compare salaries across major tech hubs worldwide
              </p>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Tech Salaries in 2026
          </h2>
          <p className="text-gray-700 mb-4">
            The tech industry continues to offer some of the most competitive salaries globally. 
            Whether you&apos;re an AI Engineer, Data Scientist, or Full Stack Developer, understanding 
            your market value is crucial for career negotiations and planning.
          </p>
          <p className="text-gray-700 mb-4">
            Our salary calculators take into account multiple factors including:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Years of experience (Junior, Mid-level, Senior)</li>
            <li>Technical skills and programming languages</li>
            <li>Geographic location and cost of living</li>
            <li>Industry demand and market trends</li>
            <li>Company size and funding stage</li>
          </ul>
          <p className="text-gray-700">
            Use our free calculators above to get personalized salary estimates and make informed 
            career decisions. All data is updated regularly to reflect current market conditions.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 AI Salary Calculator. All rights reserved. Data updated monthly.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Free tool for career planning and salary negotiations.
          </p>
        </div>
      </footer>
    </div>
  );
}
