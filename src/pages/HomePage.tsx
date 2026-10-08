import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { StickyAnchorNav } from '../components/StickyAnchorNav';
import { SectionHeader, DualPromoCTAs, DirectoryTable } from '../components/SectionBlocks';
import { WebsiteCard } from '../components/WebsiteCard';
import { CourseCard, CollectionCard, DirectoryAgencyCard, BlogCard, ProductCard } from '../components/Cards';
import { HERO_SOTD, NOMINEES, WINNERS_SOTD, ACADEMY_COURSES, COLLECTIONS, DIRECTORY_AGENCIES, BLOG_POSTS, MARKET_PRODUCTS } from '../data/mockData';
import { SiteItem } from '../types/awwwards';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectSite: (site: SiteItem) => void;
  onVote: (site: SiteItem) => void;
  onSubmitSite: () => void;
  onBePro: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectSite,
  onVote,
  onSubmitSite,
  onBePro
}) => {
  const homeAnchorItems = [
    { id: 'section-nominees', label: 'Nominees' },
    { id: 'section-winners', label: 'Recent Winners' },
    { id: 'section-academy', label: 'Courses' },
    { id: 'section-collections', label: 'Collections' },
    { id: 'section-directory', label: 'Directory' },
    { id: 'section-market', label: 'Market' },
    { id: 'section-blog', label: 'Blog' }
  ];

  return (
    <div>
      {/* Sticky Anchor Navigation Bar (Scroll-Spy) */}
      <StickyAnchorNav
        items={homeAnchorItems}
        ctaLabel="Visit Sotd."
        onCtaClick={() => onSelectSite(HERO_SOTD)}
      />

      {/* Hero: Site of the Day */}
      <HomeHero sotd={HERO_SOTD} onSelect={onSelectSite} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12 space-y-20">
        {/* 1. Latest → Nominees */}
        <section id="section-nominees">
          <SectionHeader
            eyebrow="Latest"
            title="Nominees"
            subtitle="Vote for the latest websites on awwwards."
            ctaLabel="View Nominees"
            onCtaClick={() => onNavigate('/websites?award=NOMINEE')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NOMINEES.map(site => (
              <WebsiteCard
                key={site.id}
                site={site}
                variant="nominee"
                onSelect={onSelectSite}
                onVote={onVote}
              />
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#ECECEC] flex items-center justify-between text-xs text-neutral-500">
            <span>Check out all submitted websites open for evaluation</span>
            <button
              onClick={() => onNavigate('/websites?award=NOMINEE')}
              className="font-bold text-[#181818] hover:text-[#3ea094] transition-colors cursor-pointer"
            >
              Check all Nominees →
            </button>
          </div>
        </section>

        {/* 2. Winners → Recent Sites of the Day */}
        <section id="section-winners">
          <SectionHeader
            eyebrow="Winners"
            title="Recent Sites of the Day."
            subtitle="Websites recognized for design, usability, creativity, and content."
            ctaLabel="View Winners"
            onCtaClick={() => onNavigate('/websites?award=SOTD')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WINNERS_SOTD.map(site => (
              <WebsiteCard
                key={site.id}
                site={site}
                variant="winner"
                onSelect={onSelectSite}
              />
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#ECECEC] flex items-center justify-between text-xs text-neutral-500">
            <span>Check out all award-winning digital creations</span>
            <button
              onClick={() => onNavigate('/websites?award=SOTD')}
              className="font-bold text-[#181818] hover:text-[#3ea094] transition-colors cursor-pointer"
            >
              Browse all Winners →
            </button>
          </div>
        </section>

        {/* 3. Academy */}
        <section id="section-academy">
          <SectionHeader
            eyebrow="Academy"
            title="Masterclasses & Courses"
            subtitle="Learn advanced WebGL, typography, and interaction engineering from world-class creators."
            ctaLabel="View Academy"
            onCtaClick={() => onNavigate('/academy')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMY_COURSES.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={() => onNavigate('/academy')}
              />
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#ECECEC] flex items-center justify-between text-xs text-neutral-500">
            <span>Choose from over hundreds of specialized design & code courses</span>
            <button
              onClick={() => onNavigate('/academy')}
              className="font-bold text-[#181818] hover:text-[#3ea094] transition-colors cursor-pointer"
            >
              Explore Academy →
            </button>
          </div>
        </section>

        {/* 4. Collections */}
        <section id="section-collections">
          <SectionHeader
            eyebrow="Inspiration"
            title="Curated Collections"
            subtitle="Find inspiration for your projects bookmarked by the global creative community."
            ctaLabel="View Collections"
            onCtaClick={() => onNavigate('/collections')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COLLECTIONS.map(col => (
              <CollectionCard
                key={col.id}
                collection={col}
                onSelect={() => onNavigate('/collections')}
              />
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#ECECEC] flex items-center justify-between text-xs text-neutral-500">
            <span>Find curated inspiration for your next client pitch or design system</span>
            <button
              onClick={() => onNavigate('/collections')}
              className="font-bold text-[#181818] hover:text-[#3ea094] transition-colors cursor-pointer"
            >
              Explore all Collections →
            </button>
          </div>
        </section>

        {/* 5. Directory "w.creators" */}
        <section id="section-directory">
          <SectionHeader
            eyebrow="Directory"
            title="w.creators"
            subtitle="Active creators, international studios, and independent digital artisans."
            ctaLabel="View Directory"
            onCtaClick={() => onNavigate('/directory')}
          />

          {/* 3 Featured Agency Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIRECTORY_AGENCIES.map(agency => (
              <DirectoryAgencyCard
                key={agency.id}
                agency={agency}
                onSelect={() => onNavigate('/directory')}
              />
            ))}
          </div>

          {/* Directory Table */}
          <DirectoryTable onSelectCreator={() => onNavigate('/directory')} />

          <div className="mt-8 pt-4 border-t border-[#ECECEC] flex items-center justify-between text-xs text-neutral-500">
            <span>Connect with over 6,099 Agencies and Digital Professionals</span>
            <button
              onClick={() => onNavigate('/directory')}
              className="font-bold text-[#181818] hover:text-[#3ea094] transition-colors cursor-pointer"
            >
              Browse Full Directory →
            </button>
          </div>
        </section>

        {/* 6. Blog */}
        <section id="section-blog">
          <SectionHeader
            eyebrow="Journal"
            title="Awwwards Blog"
            subtitle="Interviews, technology deep dives, and design critique."
            ctaLabel="View Blog"
            onCtaClick={() => onNavigate('/blog')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOG_POSTS.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                onSelect={() => onNavigate('/blog')}
              />
            ))}
          </div>
        </section>

        {/* 7. Market */}
        <section id="section-market">
          <SectionHeader
            eyebrow="Market"
            title="A curated marketplace for digital & physical products"
            subtitle="Mockups, variable font families, Framer components, and physical publications."
            ctaLabel="View Market"
            onCtaClick={() => onNavigate('/market')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKET_PRODUCTS.map(prod => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={() => onNavigate('/market')}
              />
            ))}
          </div>
        </section>

        {/* 8. Dual Promo CTAs */}
        <DualPromoCTAs
          onSubmitSite={onSubmitSite}
          onBePro={onBePro}
        />
      </div>
    </div>
  );
};
