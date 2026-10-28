"use client";

import { useState } from "react";

type SalaryData = {
  jobTitle: string;
  location: string;
  baseSalary: {
    junior?: { min: number; max: number; avg: number; currency: string };
    mid?: { min: number; max: number; avg: number; currency: string };
    senior?: { min: number; max: number; avg: number; currency: string };
  };
  skills: Array<{ name: string; bonus: number }>;
};

export default function SalaryCalculator({ data }: { data: SalaryData }) {
  const [experience, setExperience] = useState<"junior" | "mid" | "senior">(
    data.baseSalary.mid ? "mid" : data.baseSalary.junior ? "junior" : "senior"
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const calculateSalary = () => {
    const baseSalary = data.baseSalary[experience];
    if (!baseSalary) return { min: 0, max: 0, avg: 0, currency: "USD" };

    const skillBonus = selectedSkills.reduce((total, skillName) => {
      const skill = data.skills.find((s) => s.name === skillName);
      return total + (skill?.bonus || 0);
    }, 0);

    return {
      min: baseSalary.min + skillBonus,
      max: baseSalary.max + skillBonus,
      avg: baseSalary.avg + skillBonus,
      currency: baseSalary.currency,
    };
  };

  const result = calculateSalary();

  return (
    <div className="space-y-6">
      {/* Experience Level Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Experience Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {data.baseSalary.junior && (
            <button
              onClick={() => setExperience("junior")}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                experience === "junior"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Junior
            </button>
          )}
          {data.baseSalary.mid && (
            <button
              onClick={() => setExperience("mid")}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                experience === "mid"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Mid-Level
            </button>
          )}
          {data.baseSalary.senior && (
            <button
              onClick={() => setExperience("senior")}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                experience === "senior"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Senior
            </button>
          )}
        </div>
      </div>

      {/* Skills Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Your Skills (each adds bonus)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {data.skills.map((skill) => (
            <button
              key={skill.name}
              onClick={() => toggleSkill(skill.name)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all text-left ${
                selectedSkills.includes(skill.name)
                  ? "bg-green-100 border-2 border-green-500 text-green-800"
                  : "bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{skill.name}</span>
                <span className="text-xs">
                  +{skill.bonus.toLocaleString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💰 Your Estimated Salary Range
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Minimum:</span>
            <span className="text-2xl font-bold text-gray-900">
              {result.min.toLocaleString()} {result.currency}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Average:</span>
            <span className="text-2xl font-bold text-blue-600">
              {result.avg.toLocaleString()} {result.currency}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Maximum:</span>
            <span className="text-2xl font-bold text-gray-900">
              {result.max.toLocaleString()} {result.currency}
            </span>
          </div>
        </div>
        {selectedSkills.length > 0 && (
          <p className="text-sm text-gray-600 mt-4">
            ✨ Including bonus for {selectedSkills.length} skill(s)
          </p>
        )}
      </div>
    </div>
  );
}
