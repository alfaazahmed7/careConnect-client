'use client';

import { geist } from '@/lib/fonts/fonts';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { HiX } from 'react-icons/hi';
import { HiBars3, HiMoon, HiSun } from 'react-icons/hi2';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Find Doctors', href: '/doctors' },
    { label: 'Specialties', href: '/specialties' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Articles', href: '/articles' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const mounted = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 -mb-20 w-full text-[#0F172A] transition-colors duration-200 lg:-mb-24 dark:text-[#F8FAFC] ${isScrolled
            ? 'bg-[#F8FAFC]/95 backdrop-blur-md dark:bg-[#111827]/95'
            : 'bg-transparent'
            }`}>
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">

                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                >
                    <FaHeart className="h-7 w-7 text-current" aria-hidden="true" />
                    <span className="text-xl font-bold tracking-tight text-current">
                        Care<span className="opacity-80">Connect</span>
                    </span>
                </Link>

                <nav className={`hidden items-center gap-8 lg:flex ${geist.className}`} aria-label="Primary navigation">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={`py-1.5 text-sm font-semibold text-current ${isActive ? 'opacity-100' : 'opacity-80'}`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <button
                        onClick={toggleTheme}
                        type="button"
                        aria-label="Toggle Color Theme"
                        disabled={!mounted}
                        tabIndex={mounted ? 0 : -1}
                        className="rounded-full border border-current/30 p-2 text-current transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                    >
                        {resolvedTheme === 'dark' ? (
                            <HiSun className="w-5 h-5 text-amber-400" />
                        ) : (
                            <HiMoon className="w-5 h-5" />
                        )}
                    </button>

                    <Link
                        href="/login"
                        className="rounded-full px-4 py-2 text-sm font-semibold text-current transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                    >
                        Log in
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-full border border-current/40 px-5 py-2.5 text-sm font-semibold text-current transition-colors hover:bg-[#0F172A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-current dark:hover:bg-[#F8FAFC] dark:hover:text-[#0F172A]"
                    >
                        Get Started
                    </Link>
                </div>

                <div className="flex lg:hidden items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        type="button"
                        aria-label="Toggle Color Theme"
                        disabled={!mounted}
                        tabIndex={mounted ? 0 : -1}
                        className="rounded-full border border-current/30 p-2 text-current transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                    >
                        {resolvedTheme === 'dark' ? (
                            <HiSun className="w-5 h-5 text-amber-400" />
                        ) : (
                            <HiMoon className="w-5 h-5" />
                        )}
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        type="button"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle Navigation Drawer"
                        className="rounded-lg p-2 text-current focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
                    >
                        {isMobileMenuOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiBars3 className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="space-y-3 px-4 pb-6 pt-3 text-current lg:hidden">
                    <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`rounded-md px-3 py-2.5 text-base font-medium ${isActive ? 'font-semibold' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex flex-col gap-2.5 border-t border-current/20 pt-4">
                        <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full rounded-full border border-current/30 py-2.5 text-center text-sm font-semibold"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full rounded-full border border-current/40 py-2.5 text-center text-sm font-semibold"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}