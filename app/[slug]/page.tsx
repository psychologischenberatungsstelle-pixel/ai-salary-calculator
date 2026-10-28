import { Metadata } from "next";
import Link from "next/link";
import salariesData from "@/data/salaries.json";
import SalaryCalculator from "@/components/SalaryCalculator";
import AdBanner from "@/components/AdBanner";
import AffiliateBox from "@/components/AffiliateBox";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return salariesData.calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calculator = salariesData.calculators.find(
    (calc) => calc.slug === params.slug
  );

  if (!calculator) {
    return { title: "Calculator Not Found" };
  }

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    keywords: [calculator.jobTitle, "salary calculator", calculator.location],
  };
}

export default function CalculatorPage({ params }: Props) {
  const calculator = salariesData.calculators.find(
    (calc) => calc.slug === params.slug
  );

  if (!calculator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Calculator Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← All Calculators
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {calculator.jobTitle} Salary Calculator
          </h1>
          <p className="text-xl text-blue-100">
            📍 {calculator.location} • Updated for 2026
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Calculate Your Salary
              </h2>
              <SalaryCalculator data={calculator} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {calculator.jobTitle} Salaries in {calculator.location}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  {calculator.jobTitle}s in {calculator.location} are among the most sought-after 
                  professionals in the tech industry. The salary range varies significantly based on 
                  experience level, technical skills, and the specific company.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-3">Salary Breakdown by Experience</h3>
                <ul className="space-y-2">
                  {calculator.baseSalary.junior && (
                    <li>
                      <strong>Junior:</strong> {calculator.baseSalary.junior.min.toLocaleString()} - {calculator.baseSalary.junior.max.toLocaleString()} {calculator.baseSalary.junior.currency}
                    </li>
                  )}
                  {calculator.baseSalary.mid && (
                    <li>
                      <strong>Mid-Level:</strong> {calculator.baseSalary.mid.min.toLocaleString()} - {calculator.baseSalary.mid.max.toLocaleString()} {calculator.baseSalary.mid.currency}
                    </li>
                  )}
                  {calculator.baseSalary.senior && (
                    <li>
                      <strong>Senior:</strong> {calculator.baseSalary.senior.min.toLocaleString()} - {calculator.baseSalary.senior.max.toLocaleString()} {calculator.baseSalary.senior.currency}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <AdBanner />
            <AffiliateBox jobTitle={calculator.jobTitle} location={calculator.location} />
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 AI Salary Calculator</p>
        </div>
      </footer>
    </div>
  );
}
