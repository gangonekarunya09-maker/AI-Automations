import React, { useState } from 'react';
import { CourseCard, CollectionCard, DirectoryAgencyCard, BlogCard, ProductCard } from '../components/Cards';
import { DirectoryTable } from '../components/SectionBlocks';
import { ACADEMY_COURSES, COLLECTIONS, DIRECTORY_AGENCIES, BLOG_POSTS, MARKET_PRODUCTS } from '../data/mockData';
import { Search, Star, CheckCircle2, ArrowRight } from 'lucide-react';

// 1. Academy Page
export const AcademyPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Hero Banner: The Creative Pass */}
      <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#181818] to-[#252830] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#3ea094] px-2 py-0.5 rounded bg-[#3ea094]/15">
            The Creative Pass
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Learn from the designers winning Sites of the Year.
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Gain unlimited access to 100+ masterclasses in WebGL, Three.js, interaction design, and art direction for just $12/month.
          </p>
        </div>
        <button className="px-6 py-3 rounded-sm bg-[#3ea094] hover:bg-[#33857b] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shadow-md">
          Start 7-Day Free Trial
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-[#181818]">Featured Masterclasses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACADEMY_COURSES.map(course => (
            <CourseCard key={course.id} course={course} onSelect={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Collections Page
export const CollectionsPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#181818]">Curated Collections</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Explore thematic boards bookmarked by the creative community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COLLECTIONS.map(col => (
          <CollectionCard key={col.id} collection={col} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};

// 3. Directory Page
export const DirectoryPage: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#181818]">w.creators Directory</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Connect with top digital agencies, independent art directors, and creative technologists worldwide.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#181818]">Featured International Studios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIRECTORY_AGENCIES.map(agency => (
            <DirectoryAgencyCard key={agency.id} agency={agency} onSelect={() => {}} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#181818]">Active Creators Index</h2>
        <DirectoryTable onSelectCreator={() => {}} />
      </div>
    </div>
  );
};

// 4. Market Page
export const MarketPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#181818]">Awwwards Market</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Digital tools, variable font families, Framer components, and physical publications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MARKET_PRODUCTS.map(prod => (
          <ProductCard key={prod.id} product={prod} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};

// 5. Blog Page
export const BlogPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#181818]">Awwwards Journal & Blog</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Articles, interviews, case studies, and industry trends.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BLOG_POSTS.map(post => (
          <BlogCard key={post.id} post={post} onSelect={() => {}} />
        ))}
      </div>
    </div>
  );
};
