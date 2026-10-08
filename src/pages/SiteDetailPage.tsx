import React, { useState } from 'react';
import { ExternalLink, Twitter, Linkedin, Facebook, Share2, ArrowLeft, Check, Award, Layers } from 'lucide-react';
import { SiteItem } from '../types/awwwards';
import { StickyAnchorNav } from '../components/StickyAnchorNav';
import { ScoreBlock, VotesTable, DevAwardBlock, ColorPaletteBlock } from '../components/EvaluationBlocks';
import { CollectionCard } from '../components/Cards';
import { COLLECTIONS } from '../data/mockData';

interface SiteDetailPageProps {
  site: SiteItem;
  onBack: () => void;
  onSelectColor: (hex: string) => void;
  onSelectTag: (tag: string) => void;
  onSelectCollection: () => void;
}

export const SiteDetailPage: React.FC<SiteDetailPageProps> = ({
  site,
  onBack,
  onSelectColor,
  onSelectTag,
  onSelectCollection
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const detailAnchorItems = [
    { id: 'section-creator', label: 'Creator' },
    { id: 'section-palette', label: 'Font & Color' },
    { id: 'section-details', label: 'Details' },
    { id: 'section-score', label: 'Score & Votes' },
    { id: 'section-collections', label: 'Collections' }
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      {/* Sticky Anchor Sub-Nav: Creator | Font & Color | Details | Score + "Visit Site" CTA */}
      <StickyAnchorNav
        items={detailAnchorItems}
        ctaLabel="Visit Site"
        ctaUrl={site.liveUrl}
        offsetThreshold={200}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Gallery</span>
        </button>

        {/* 1. Title Strip: "{Site} by {creator}", share links, visit link, SOTD badge + score */}
        <div id="section-creator" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ECECEC]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3ea094]">
                {site.awardType} WINNER
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500 text-xs font-mono">{site.date}</span>
            </div>

            <div className="text-sm font-semibold text-neutral-800">
              <span className="text-neutral-900 font-bold">{site.title}</span>
              <span className="text-neutral-400 mx-1.5">by</span>
              <span className="font-bold underline text-black cursor-pointer">{site.creator.name}</span>
              {site.creator.isPro && (
                <span className="ml-2 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-black text-white">
                  PRO
                </span>
              )}
            </div>
          </div>

          {/* Share and Action Controls */}
          <div className="flex items-center gap-3">
            {/* Share icons (Twitter/X, LinkedIn, Facebook) */}
            <div className="flex items-center gap-2 text-neutral-500 border-r border-[#ECECEC] pr-3">
              <button onClick={handleShare} className="p-1.5 hover:text-black transition-colors" title="Copy share link">
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=Check out ${site.title} on Awwwards`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-black transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${site.liveUrl}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-black transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${site.liveUrl}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-black transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              {copiedShare && (
                <span className="text-[10px] text-[#3ea094] font-mono font-bold">Copied!</span>
              )}
            </div>

            {/* Visit site link & SOTD badge score */}
            <a
              href={site.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-sm bg-[#181818] hover:bg-[#3ea094] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#F0F0F0] border border-[#E0E0E0] font-mono text-xs font-bold text-neutral-900">
              <Award className="w-4 h-4 text-[#3ea094]" />
              <span>{site.score.toFixed(2)} / 10</span>
            </div>
          </div>
        </div>

        {/* 2. Hero Preview Image + H1 */}
        <div className="py-8 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#181818] leading-[1.08] mb-2">
              {site.title}
            </h1>
            <p className="text-sm font-mono text-neutral-500">
              {site.url} · {site.category} · {site.country}
            </p>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-100 border border-[#E0E0E0] shadow-md">
            <img
              src={site.heroImage || site.thumbnail}
              alt={site.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3. Description & Technologies Tag Chips */}
        <div id="section-details" className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-10 border-t border-[#ECECEC]">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-2">
                Curatorial Overview
              </div>
              <p className="text-base sm:text-lg text-neutral-800 leading-relaxed font-medium">
                {site.description}
              </p>
            </div>

            {/* Technologies & Category Tag Chips */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">
                Technologies, Tools & Style Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {site.tags?.map(tag => (
                  <button
                    key={tag}
                    onClick={() => onSelectTag(tag)}
                    className="px-3 py-1 rounded-sm bg-white border border-[#D0D0D0] hover:border-black text-xs font-semibold text-neutral-800 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
                {site.technologies?.map(tech => (
                  <button
                    key={tech}
                    onClick={() => onSelectTag(tech)}
                    className="px-3 py-1 rounded-sm bg-[#181818] text-white hover:bg-[#3ea094] text-xs font-semibold font-mono transition-colors cursor-pointer"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="p-6 rounded-xl border border-[#ECECEC] bg-white space-y-4 text-xs">
            <h4 className="font-bold text-sm text-[#181818] border-b border-[#F0F0F0] pb-2">
              Project Specification
            </h4>
            <div className="space-y-2.5 font-mono text-neutral-600">
              <div className="flex justify-between">
                <span>Primary Font:</span>
                <strong className="text-neutral-900 font-sans">{site.font || 'Plus Jakarta Sans'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Country of Origin:</span>
                <strong className="text-neutral-900 font-sans">{site.country}</strong>
              </div>
              <div className="flex justify-between">
                <span>Award Date:</span>
                <strong className="text-neutral-900">{site.date}</strong>
              </div>
              <div className="flex justify-between">
                <span>Submission Type:</span>
                <strong className="text-neutral-900">Agency Portfolio</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Inside Look (Desktop & Mobile Element Thumbnails) */}
        {site.elements && site.elements.length > 0 && (
          <div className="py-10 border-t border-[#ECECEC] space-y-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
                Inside Look
              </div>
              <h3 className="text-2xl font-extrabold text-[#181818]">
                Featured Elements & Responsive Views
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {site.elements.map((el, idx) => (
                <div key={idx} className="rounded-xl border border-[#ECECEC] bg-white overflow-hidden p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
                    <span className="uppercase text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100">{el.type} ELEMENT</span>
                    <span>{el.title}</span>
                  </div>
                  <div className="aspect-[16/10] rounded-md overflow-hidden bg-neutral-100 border border-[#ECECEC]">
                    <img src={el.thumbnail} alt={el.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Color Palette */}
        {site.colors && site.colors.length > 0 && (
          <div className="py-10 border-t border-[#ECECEC]">
            <ColorPaletteBlock
              colors={site.colors}
              onSelectColor={onSelectColor}
            />
          </div>
        )}

        {/* 6. Score Block (4 Weighted Criteria: 40/30/20/10) */}
        <div className="py-10 border-t border-[#ECECEC] space-y-8">
          <ScoreBlock
            score={site.score}
            weightedScore={site.weightedScore}
          />

          {/* 7. Votes Table (Jury & Community Members) */}
          <VotesTable jurorVotes={site.jurorVotes} />

          {/* 8. DEV AWARD Block */}
          <DevAwardBlock devScore={site.devAwardScore} />
        </div>

        {/* 9. Collections Carousel */}
        <div id="section-collections" className="py-12 border-t border-[#ECECEC] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
                Inspiration
              </div>
              <h3 className="text-2xl font-extrabold text-[#181818]">
                Included in Curated Collections
              </h3>
            </div>
            <button
              onClick={onSelectCollection}
              className="text-xs font-bold text-neutral-800 hover:text-[#3ea094] uppercase"
            >
              Browse Collections →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COLLECTIONS.map(col => (
              <CollectionCard
                key={col.id}
                collection={col}
                onSelect={onSelectCollection}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
