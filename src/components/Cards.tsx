import React from 'react';
import { Star, ArrowRight, ExternalLink, Award, Layers } from 'lucide-react';
import { CourseItem, CollectionItem, CreatorAgency, BlogPost, MarketProduct } from '../types/awwwards';

// 1. Academy Course Card
export const CourseCard: React.FC<{ course: CourseItem; onSelect: () => void }> = ({ course, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer flex flex-col justify-between bg-white rounded-md border border-[#ECECEC] overflow-hidden hover:border-neutral-400 transition-all shadow-xs"
    >
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {course.badge && (
            <span className="absolute top-2.5 left-2.5 text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-[#3ea094] text-white uppercase">
              {course.badge}
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-1">
            ACADEMY MASTERCLASS
          </div>
          <h3 className="font-bold text-[14px] text-neutral-900 group-hover:text-[#3ea094] transition-colors line-clamp-2 leading-snug mb-2">
            {course.title}
          </h3>
          <div className="text-xs text-neutral-500">
            Instructor <span className="font-semibold text-neutral-800">{course.instructor}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-[#F0F0F0] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-neutral-700 font-bold font-mono">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{course.score.toFixed(1)}/5</span>
          <span className="text-neutral-400 font-normal">({course.reviewCount})</span>
        </div>
        <span className="text-[#3ea094] font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
          Learn →
        </span>
      </div>
    </div>
  );
};

// 2. Collection Card (with AvatarStack +147)
export const CollectionCard: React.FC<{ collection: CollectionItem; onSelect: () => void }> = ({ collection, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer rounded-lg border border-[#ECECEC] bg-white p-6 hover:border-neutral-400 transition-all flex flex-col justify-between shadow-xs"
    >
      <div>
        {/* Mosaic preview grid */}
        <div className="grid grid-cols-3 gap-2 aspect-[16/7] rounded-md overflow-hidden bg-neutral-100 mb-5">
          {collection.thumbnails.map((thumb, idx) => (
            <img
              key={idx}
              src={thumb}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-1.5">
          <span>COLLECTION</span>
          <span>·</span>
          <span className="text-[#3ea094]">{collection.category}</span>
        </div>

        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#3ea094] transition-colors leading-snug mb-4">
          {collection.title}
        </h3>
      </div>

      {/* Follower avatar stack */}
      <div className="pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {collection.followers.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt=""
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <div className="text-xs text-neutral-500 font-medium">
            followed by <span className="font-semibold text-neutral-800">+{collection.followerCount}</span>
          </div>
        </div>

        <span className="text-xs font-semibold text-neutral-700 group-hover:text-black">
          View Collection →
        </span>
      </div>
    </div>
  );
};

// 3. Directory Agency Card (with 5-thumbnail work strip)
export const DirectoryAgencyCard: React.FC<{ agency: CreatorAgency; onSelect: () => void }> = ({ agency, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer rounded-lg border border-[#ECECEC] bg-white p-5 hover:border-neutral-400 transition-all flex flex-col justify-between shadow-xs"
    >
      <div>
        {/* Header with Avatar and Name */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={agency.avatar}
            alt={agency.name}
            className="w-11 h-11 rounded-full object-cover border border-[#E7E7E7]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-neutral-900 group-hover:text-[#3ea094] transition-colors">
                {agency.name}
              </h3>
              {agency.isPro && (
                <span className="text-[9px] font-mono font-bold px-1 rounded bg-black text-white">PRO</span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400">{agency.region} · {agency.category}</div>
          </div>
        </div>

        {/* 5-Thumbnail Work Strip */}
        <div className="grid grid-cols-5 gap-1.5 aspect-[5/1.2] rounded overflow-hidden mb-4">
          {agency.workThumbnails.map((thumb, idx) => (
            <img
              key={idx}
              src={thumb}
              alt=""
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>

      {/* Meta Footer */}
      <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between text-xs text-neutral-500 font-mono">
        <div>Works <strong className="text-neutral-900">{agency.worksCount}</strong></div>
        <div className="flex items-center gap-1 text-[#3ea094] font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>{agency.awardsCount} awards</span>
        </div>
      </div>
    </div>
  );
};

// 4. Blog Post Card
export const BlogCard: React.FC<{ post: BlogPost; onSelect: () => void }> = ({ post, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer flex flex-col justify-between rounded-md border border-[#ECECEC] bg-white overflow-hidden hover:border-neutral-400 transition-all shadow-xs"
    >
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#3ea094] mb-1">
            {post.subtitle}
          </div>
          <h3 className="font-bold text-[15px] text-neutral-900 group-hover:text-[#3ea094] transition-colors leading-snug mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-[#F0F0F0] flex items-center justify-between text-[11px] text-neutral-400">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </div>
    </div>
  );
};

// 5. Market Product Card
export const ProductCard: React.FC<{ product: MarketProduct; onSelect: () => void }> = ({ product, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group cursor-pointer flex flex-col justify-between rounded-md border border-[#ECECEC] bg-white overflow-hidden hover:border-neutral-400 transition-all shadow-xs"
    >
      <div>
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-4">
          <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-1">
            {product.type}
          </div>
          <h3 className="font-bold text-sm text-neutral-900 group-hover:text-[#3ea094] transition-colors line-clamp-2 leading-snug mb-1">
            {product.title}
          </h3>
          <div className="text-xs text-neutral-500">
            By <span className="font-semibold text-neutral-800">{product.seller}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-[#F0F0F0] flex items-center justify-between text-xs">
        {product.price !== undefined ? (
          <div className="font-mono text-neutral-900 font-bold">
            from ${product.price} USD
          </div>
        ) : (
          <div className="font-mono text-[#3ea094] font-bold">
            Free Download
          </div>
        )}
        <span className="text-neutral-700 font-semibold group-hover:text-black">
          View Item →
        </span>
      </div>
    </div>
  );
};
