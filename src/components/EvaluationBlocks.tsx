import React, { useState } from 'react';
import { Award, Check, ExternalLink, HelpCircle, User } from 'lucide-react';
import { JurorVote } from '../types/awwwards';

// 1. Score Block: 4 Weighted Criteria (Design 40%, Usability 30%, Creativity 20%, Content 10%)
export const ScoreBlock: React.FC<{
  score: number;
  weightedScore?: {
    design: number;
    usability: number;
    creativity: number;
    content: number;
  };
}> = ({ score, weightedScore }) => {
  const criteria = [
    { label: 'Design', weight: '40%', score: weightedScore?.design || 8.42 },
    { label: 'Usability', weight: '30%', score: weightedScore?.usability || 7.15 },
    { label: 'Creativity', weight: '20%', score: weightedScore?.creativity || 8.60 },
    { label: 'Content', weight: '10%', score: weightedScore?.content || 7.80 }
  ];

  return (
    <div id="section-score" className="p-6 sm:p-8 rounded-xl border border-[#ECECEC] bg-white shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F0F0]">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#3ea094] font-bold">
            Site of the Day · Evaluation System
          </div>
          <h3 className="text-2xl font-extrabold text-[#181818] tracking-tight">
            Overall Score
          </h3>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-mono font-black text-[#181818] tracking-tighter">
            {score.toFixed(2)}
          </span>
          <span className="text-neutral-400 font-mono text-sm font-semibold">
            / 10
          </span>
        </div>
      </div>

      {/* 4 Weighted Criteria Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {criteria.map(c => {
          const percentage = (c.score / 10) * 100;
          return (
            <div key={c.label} className="space-y-2">
              <div className="flex items-baseline justify-between text-xs font-semibold">
                <span className="text-neutral-800">{c.label} <span className="text-neutral-400 font-mono font-normal">({c.weight})</span></span>
                <span className="font-mono text-[#3ea094] font-bold">{c.score.toFixed(2)}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className="h-full bg-[#181818] rounded-full transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-right">
        <a href="#evaluation-system" className="text-xs text-neutral-400 hover:text-black inline-flex items-center gap-1">
          <span>Learn how the weighted evaluation system works</span>
          <HelpCircle className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

// 2. Votes Table (Jury & Community Members Tabs)
export const VotesTable: React.FC<{ jurorVotes?: JurorVote[] }> = ({ jurorVotes = [] }) => {
  const [activeTab, setActiveTab] = useState<'jury' | 'community'>('jury');

  return (
    <div className="rounded-xl border border-[#ECECEC] bg-white overflow-hidden shadow-xs space-y-4 p-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('jury')}
            className={`px-4 py-1.5 text-xs font-bold rounded-sm transition-colors cursor-pointer ${
              activeTab === 'jury'
                ? 'bg-[#181818] text-white'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            International Jury ({jurorVotes.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-1.5 text-xs font-bold rounded-sm transition-colors cursor-pointer ${
              activeTab === 'community'
                ? 'bg-[#181818] text-white'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            Community Members (142)
          </button>
        </div>

        <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
          Weighted Average Breakdown
        </span>
      </div>

      {activeTab === 'jury' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F8] border-b border-[#ECECEC] text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Juror</th>
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3 text-right">Design</th>
                <th className="py-2.5 px-3 text-right">Usability</th>
                <th className="py-2.5 px-3 text-right">Creativity</th>
                <th className="py-2.5 px-3 text-right">Content</th>
                <th className="py-2.5 px-4 text-right">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] font-mono text-xs">
              {jurorVotes.map(j => (
                <tr key={j.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={j.avatar}
                        alt={j.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#E7E7E7]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-neutral-900">{j.name}</div>
                        <div className="text-[10px] text-neutral-400">{j.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-neutral-500 font-sans">
                    {j.country}
                  </td>

                  <td className="py-3 px-3 text-right text-neutral-700">{j.design.toFixed(1)}</td>
                  <td className="py-3 px-3 text-right text-neutral-700">{j.usability.toFixed(1)}</td>
                  <td className="py-3 px-3 text-right text-neutral-700">{j.creativity.toFixed(1)}</td>
                  <td className="py-3 px-3 text-right text-neutral-700">{j.content.toFixed(1)}</td>
                  <td className="py-3 px-4 text-right font-bold text-[#3ea094]">{j.overall.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center text-neutral-500 text-xs">
          <div className="max-w-md mx-auto space-y-2">
            <div className="font-bold text-neutral-800 text-sm">Community Member Rating: 7.24 / 10</div>
            <p className="text-neutral-400 leading-relaxed">
              Based on 142 community votes from verified Pro members and creative developers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. DEV AWARD Block: 6 Technical Criteria
export const DevAwardBlock: React.FC<{
  devScore?: {
    overall: number;
    semantics: number;
    animations: number;
    accessibility: number;
    wpo: number;
    responsive: number;
    markup: number;
  };
}> = ({ devScore }) => {
  const criteria = [
    { label: 'Semantics / SEO', score: devScore?.semantics || 8.5 },
    { label: 'Animations / Transitions', score: devScore?.animations || 9.2 },
    { label: 'Accessibility', score: devScore?.accessibility || 7.4 },
    { label: 'WPO (Performance)', score: devScore?.wpo || 8.0 },
    { label: 'Responsive Design', score: devScore?.responsive || 8.3 },
    { label: 'Markup / Meta-data', score: devScore?.markup || 8.2 }
  ];

  return (
    <div className="p-6 sm:p-8 rounded-xl border border-[#ECECEC] bg-white shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F0F0]">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#181818] font-bold">
            Developer Award · Code Quality Audit
          </div>
          <h3 className="text-2xl font-extrabold text-[#181818] tracking-tight">
            Technical Evaluation
          </h3>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-mono font-black text-[#181818]">
            {(devScore?.overall || 8.10).toFixed(2)}
          </span>
          <span className="text-neutral-400 font-mono text-sm font-semibold">
            / 10
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {criteria.map(c => (
          <div key={c.label} className="p-3 rounded-lg bg-[#F8F8F8] border border-[#ECECEC] space-y-1">
            <div className="text-[11px] text-neutral-500 font-medium leading-tight h-8">
              {c.label}
            </div>
            <div className="text-lg font-mono font-bold text-[#3ea094]">
              {c.score.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Color Palette Block (Swatches with HEX + "Aa" Letter)
export const ColorPaletteBlock: React.FC<{
  colors: string[];
  onSelectColor: (hex: string) => void;
}> = ({ colors, onSelectColor }) => {
  return (
    <div id="section-palette" className="space-y-4">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
          Color Palette
        </div>
        <h3 className="text-xl font-extrabold text-[#181818]">
          This website uses a color palette of {colors.length} colors
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {colors.map((hex) => (
          <div
            key={hex}
            onClick={() => onSelectColor(hex)}
            className="group cursor-pointer p-4 rounded-xl border border-[#ECECEC] bg-white hover:border-black transition-all flex flex-col justify-between h-32 shadow-xs"
          >
            {/* Large "Aa" Typography Sample */}
            <div
              className="text-4xl font-serif font-black tracking-tighter"
              style={{ color: hex }}
            >
              Aa
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#F0F0F0]">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                  style={{ backgroundColor: hex }}
                />
                <span className="font-bold text-neutral-800">{hex}</span>
              </div>
              <span className="text-neutral-400 group-hover:text-[#3ea094]">
                Filter →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
