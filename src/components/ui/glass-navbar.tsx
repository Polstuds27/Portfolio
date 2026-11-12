// Adapted from EasyUI Glass Navbar by Suraj Maurya (MIT): https://github.com/Surajmaurya1/easyui
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NavItem {
  id?: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  active?: boolean;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export interface GlassNavbarProps {
  /** Brand / Logo element or text */
  brand?: React.ReactNode;
  /** Brand link destination */
  /** Navigation links */
  items?: NavItem[];
  /** Right-hand side call-to-action button or custom element */
  cta?: React.ReactNode;
  /** Currently active item ID or label */
  activeId?: string;
  /** Floating pill style vs full-width attached bar */
  variant?: 'floating' | 'full-width';
  /** Sticky positioning at the top of the viewport */
  sticky?: boolean;
  /** Enable background blur glassmorphism effect */
  glass?: boolean;
  /** Additional container classes */
  className?: string;
  /** Callback when navigation item is clicked */
  onItemSelect?: (item: NavItem) => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  brand = (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-[var(--elevated)] border border-[var(--line-soft)] flex items-center justify-center font-bold text-xs text-[var(--ink)]">
        E
      </div>
      <span className="font-semibold text-sm tracking-tight text-[var(--ink)]">EasyUI</span>
    </div>
  ),
  items = [
    { label: 'Overview', href: '#overview' },
    { label: 'Components', href: '#components', badge: '16+' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Docs', href: '#docs' },
  ],
  cta = (
    <a
      href="#get-started"
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAFAFA] text-[#050505] text-xs font-medium hover:bg-white transition-colors focus-ring shadow-xs"
    >
      <span>Get Started</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </a>
  ),
  activeId,
  variant = 'floating',
  sticky = true,
  glass = true,
  className,
  onItemSelect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>(
    activeId || (items.find((i) => i.active)?.label ?? items[0]?.label ?? '')
  );
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (activeId) {
      setActiveItem(activeId);
    }
  }, [activeId]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setActiveItem(item.id || item.label);
    if (item.onClick) {
      item.onClick(e);
    }
    if (onItemSelect) {
      onItemSelect(item);
    }
    setMobileMenuOpen(false);
  };

  const isFloating = variant === 'floating';

  return (
    <header
      ref={navRef}
      className={cn(
        'w-full z-50',
        sticky && 'sticky top-0',
        isFloating ? 'pt-3 sm:pt-4 px-4 sm:px-6' : 'px-0',
        className
      )}
      role="banner"
    >
      <div
        className={cn(
          'relative mx-auto',
          isFloating
            ? 'max-w-6xl rounded-full border border-[var(--line)] px-3 sm:px-4 py-2 shadow-[var(--shadow)]'
            : 'w-full border-b border-[var(--line-soft)] px-4 sm:px-8 py-3.5',
          mobileMenuOpen && 'rounded-[28px]',
          glass
            ? 'bg-[var(--paper)] xl:bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] xl:backdrop-blur-md'
            : 'bg-[var(--paper)]'
        )}
      >
        <nav
          className="flex items-center justify-between gap-4"
          aria-label="Main Navigation"
        >
          {/* Brand / Logo */}
          <div className="flex shrink-0 items-center gap-2">{brand}</div>

          {/* Desktop Navigation Links */}
          <div
            className="hidden xl:flex items-center gap-1 relative"
          >
            {items.map((item) => {
              const currentId = item.id || item.label;
              const isCurrent = activeItem === currentId;

              return (
                <a
                  key={currentId}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={cn(
                    'relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-150 flex items-center gap-1.5 focus-ring select-none cursor-pointer',
                    isCurrent
                      ? 'bg-[var(--elevated)] text-[var(--ink)]'
                      : 'text-[var(--muted)] hover:bg-[var(--elevated)] hover:text-[var(--ink)]'
                  )}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="w-3.5 h-3.5 text-current shrink-0">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[var(--elevated)] border border-[var(--line-soft)] text-[#A1A1A1]">
                      {item.badge}
                    </span>
                  )}
                  {item.external && (
                    <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Right Action Area / CTA */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            {cta}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            {cta && (
              <div>{cta}</div>
            )}
            <button
              type="button"
              aria-controls="glass-mobile-menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-full bg-[var(--elevated)] border border-[var(--line-soft)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--line)] transition-colors focus-ring cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
            <div
              id="glass-mobile-menu"
              className="mobile-nav-enter max-h-[calc(100dvh-6rem)] overflow-y-auto xl:hidden pt-3 mt-3 border-t border-[var(--line-soft)]"
            >
              <div className="flex flex-col gap-1 pb-2">
                {items.map((item) => {
                  const currentId = item.id || item.label;
                  const isCurrent = activeItem === currentId;

                  return (
                    <a
                      key={currentId}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors focus-ring cursor-pointer',
                        isCurrent
                          ? 'bg-[var(--elevated)] text-[var(--ink)] border border-[var(--line-soft)]'
                          : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--elevated)]'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && (
                          <span className="w-4 h-4 text-current">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono leading-none bg-[var(--elevated)] border border-[var(--line-soft)] text-[#A1A1A1]">
                            {item.badge}
                          </span>
                        )}
                        {item.external && (
                          <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
                        )}
                      </div>
                    </a>
                  );
                })}

                {cta && (
                  <div className="pt-2 mt-2 border-t border-[var(--line-soft)] flex flex-col">
                    {cta}
                  </div>
                )}
              </div>
            </div>
        )}
      </div>
    </header>
  );
};
