'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { HiSun, HiMoon, HiBars3 } from 'react-icons/hi2';
import { FaHeart } from 'react-icons/fa6';
import { HiX } from 'react-icons/hi';

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
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by waiting for client mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/90 border-[#E2E8F0] backdrop-blur-md dark:bg-[#111827]/90 dark:border-[#334155] transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Brand Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg p-1"
                >
                    <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                        <FaHeart className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
                        Care<span className="text-[#2563EB]">Connect</span>
                    </span>
                </Link>

                {/* Desktop Navigation Routes */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative py-1.5 text-sm font-medium transition-colors duration-200 group ${isActive
                                        ? 'text-[#2563EB] font-semibold'
                                        : 'text-[#475569] hover:text-[#0F172A] dark:text-[#CBD5E1] dark:hover:text-[#F8FAFC]'
                                    }`}
                            >
                                {link.label}
                                <span
                                    className={`absolute left-0 bottom-0 h-0.5 bg-[#2563EB] rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action Controls */}
                <div className="hidden md:flex items-center gap-5">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            type="button"
                            aria-label="Toggle Color Theme"
                            className="p-2.5 rounded-full text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] dark:text-[#CBD5E1] dark:hover:text-[#F8FAFC] dark:hover:bg-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        >
                            {resolvedTheme === 'dark' ? (
                                <HiSun className="w-5 h-5 text-amber-400" />
                            ) : (
                                <HiMoon className="w-5 h-5" />
                            )}
                        </button>
                    )}

                    <Link
                        href="/login"
                        className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] dark:text-[#2563EB] dark:hover:text-[#1D4ED8] px-3 py-2 transition-colors duration-200"
                    >
                        Log in
                    </Link>

                    <Link
                        href="/register"
                        className="text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center gap-2">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            type="button"
                            aria-label="Toggle Color Theme"
                            className="p-2 rounded-full text-[#475569] hover:bg-[#F1F5F9] dark:text-[#CBD5E1] dark:hover:bg-[#1E293B]"
                        >
                            {resolvedTheme === 'dark' ? (
                                <HiSun className="w-5 h-5 text-amber-400" />
                            ) : (
                                <HiMoon className="w-5 h-5" />
                            )}
                        </button>
                    )}

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        type="button"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle Navigation Drawer"
                        className="p-2 rounded-lg text-[#475569] hover:bg-[#F1F5F9] dark:text-[#CBD5E1] dark:hover:bg-[#1E293B]"
                    >
                        {isMobileMenuOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiBars3 className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-[#E2E8F0] dark:border-[#334155] bg-[#FFFFFF] dark:bg-[#111827] px-4 pt-3 pb-6 space-y-3 shadow-lg">
                    <nav className="flex flex-col space-y-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${isActive
                                            ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold dark:bg-[#1E293B] dark:text-[#2563EB]'
                                            : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] dark:text-[#CBD5E1] dark:hover:bg-[#1E293B] dark:hover:text-[#F8FAFC]'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#334155] flex flex-col gap-2.5">
                        <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-center py-2.5 rounded-lg text-sm font-semibold border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-center py-2.5 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}