'use client';

import { geist } from '@/lib/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
    HiCheck,
    HiCheckCircle,
    HiClock,
    HiMagnifyingGlass,
    HiMapPin,
    HiShieldCheck,
    HiStar,
    HiVideoCamera
} from 'react-icons/hi2';

type SearchTab = 'specialty' | 'name' | 'condition';

export default function Banner() {
    const [activeTab, setActiveTab] = useState<SearchTab>('specialty');
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    const searchPlaceholders: Record<SearchTab, string> = {
        specialty: 'e.g. Cardiology, Dermatology...',
        name: 'e.g. Dr. Sarah Mitchell...',
        condition: 'e.g. Back pain, Diabetes...',
    };

    return (
        <section className="relative overflow-x-clip bg-[#F8FAFC] dark:bg-[#0F172A] pt-28 pb-16 lg:pt-32 lg:pb-24 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Banner Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Column - Headline & Search */}
                    <div className="min-w-0 lg:col-span-7 space-y-6 text-left">

                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] dark:bg-[#1E293B] border border-[#2563EB]/20 text-xs sm:text-sm font-medium text-[#2563EB]">
                            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                            1,200+ verified doctors available now
                        </div>

                        {/* Main Title */}
                        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-[1.15] ${geist.className}`}>
                            Find the Right <br className="hidden sm:inline" />
                            <span className="text-[#2563EB]">Doctor, Right Now</span>
                        </h1>

                        {/* Supporting Description */}
                        <p className="text-base sm:text-lg text-[#475569] dark:text-[#CBD5E1] max-w-2xl leading-relaxed">
                            Search verified doctors by specialty, condition, or name. Book appointments instantly — online or in-person — and take control of your health.
                        </p>

                        {/* Search Box Card */}
                        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-200/50 dark:shadow-none border border-[#E2E8F0] dark:border-[#334155] space-y-4">

                            {/* Tab Selectors */}
                            <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] dark:border-[#334155] pb-3">
                                {(['specialty', 'name', 'condition'] as SearchTab[]).map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all duration-200 ${activeTab === tab
                                            ? 'bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E293B] dark:text-[#2563EB]'
                                            : 'text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]'
                                            }`}
                                    >
                                        {tab === 'name' ? 'Doctor Name' : tab}
                                    </button>
                                ))}
                            </div>

                            {/* Input Controls */}
                            <div className="flex min-w-0 flex-col sm:flex-row items-stretch gap-3">

                                {/* Search Input */}
                                <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] focus-within:border-[#2563EB] dark:focus-within:border-[#2563EB] transition-colors">
                                    <HiMagnifyingGlass className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={searchPlaceholders[activeTab]}
                                        className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] focus:outline-none"
                                    />
                                </div>

                                {/* Location Input */}
                                <div className="min-w-0 sm:w-1/3 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] focus-within:border-[#2563EB] dark:focus-within:border-[#2563EB] transition-colors">
                                    <HiMapPin className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                                    <input
                                        type="text"
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                        placeholder="Location"
                                        className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] focus:outline-none"
                                    />
                                </div>

                                {/* Submit Action */}
                                <Link
                                    href={`/doctors?type=${activeTab}&q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}`}
                                    className="flex items-center justify-center px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-[0.98] shrink-0"
                                >
                                    Find Doctors
                                </Link>
                            </div>
                        </div>

                        {/* Sub-links */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium pt-1">
                            <Link href="/how-it-works" className="text-[#475569] dark:text-[#CBD5E1] hover:text-[#2563EB] transition-colors">
                                How does it work? &gt;
                            </Link>
                            <Link href="/doctor/register" className="text-[#0D9488] dark:text-[#0D9488] hover:text-[#0F766E] font-semibold transition-colors">
                                Are you a doctor? Join CareConnect &rarr;
                            </Link>
                        </div>

                        {/* Stats Summary */}
                        <div className="pt-6 border-t border-[#E2E8F0] dark:border-[#334155] grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">1,200+</p>
                                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">Verified Doctors</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">50,000+</p>
                                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">Patients Served</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">4.9 / 5</p>
                                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">Average Rating</p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Visual Graphic Composite */}
                    <div className="min-w-0 lg:col-span-5 relative flex flex-col items-center justify-center gap-4 sm:gap-6">

                        {/* Top Row: Blue Badge + Featured Doctor Card */}
                        <div className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-start">

                            {/* Blue Card Accent */}
                            <div className="min-w-0 bg-[#2563EB] text-white p-4 sm:p-5 rounded-2xl shadow-lg flex items-center gap-4 transform lg:-translate-x-6">
                                <div className="flex -space-x-2 overflow-hidden">
                                    <Image width={32} height={32} className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="User" />
                                    <Image width={32} height={32} className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="User" />
                                    <Image width={32} height={32} className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop" alt="User" />
                                    <div className="h-8 w-8 rounded-full bg-blue-700 ring-2 ring-white flex items-center justify-center text-xs font-semibold text-white">
                                        +
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-bold">1,200+ Doctors</h4>
                                    <p className="text-xs text-blue-100">ready to help you today</p>
                                </div>
                            </div>

                            {/* Primary Doctor Preview Card */}
                            <div className="w-full max-w-sm min-w-0 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-4 shadow-xl ml-auto">
                                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3">
                                    <Image
                                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop"
                                        alt="Dr. Sarah Mitchell"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">Dr. Sarah Mitchell</h3>
                                        <HiCheckCircle className="w-4 h-4 text-[#2563EB]" />
                                    </div>
                                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Cardiologist &bull; 14 yrs exp</p>
                                    <div className="flex items-center gap-1 text-xs text-amber-500 font-medium pt-1">
                                        <HiStar className="w-4 h-4 fill-amber-400" />
                                        <span>4.9</span>
                                        <span className="text-[#64748B] dark:text-[#94A3B8]">(312 reviews)</span>
                                    </div>
                                </div>
                                <Link
                                    href="/doctors/dr-sarah-mitchell"
                                    className="mt-3 w-full inline-block text-center py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors"
                                >
                                    Book Appointment
                                </Link>
                            </div>

                        </div>

                        {/* Floating Confirmation Card */}
                        <div className="w-full max-w-sm bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-3 shadow-lg flex items-center gap-3 self-start lg:ml-2">
                            <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center shrink-0">
                                <HiCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">Appointment Confirmed</p>
                                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Today, 3:00 PM &bull; Online Consultation</p>
                            </div>
                        </div>

                        {/* Bottom Row: Satisfaction & Verification Badge */}
                        <div className="w-full flex flex-wrap items-center justify-between gap-4 pt-2">
                            <div className="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-full px-3.5 py-1.5 shadow-sm flex items-center gap-2 text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                                <HiShieldCheck className="w-4 h-4 text-[#16A34A]" />
                                <span className="font-semibold">All Doctors Verified</span>
                            </div>

                            <div className="min-w-0 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-3.5 shadow-lg space-y-1">
                                <p className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">Patient Satisfaction</p>
                                <p className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">98%</p>
                                <div className="flex items-center gap-1 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <HiStar key={i} className="w-3 h-3 fill-amber-400" />
                                        ))}
                                    </div>
                                    <span className="break-words">5.0 from 50,000+ patients</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Bottom Trust Indicators Bar */}
                <div className="mt-16 pt-8 border-t border-[#E2E8F0] dark:border-[#334155] flex flex-wrap items-center justify-center sm:justify-between gap-6 text-xs sm:text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">
                    <div className="flex items-center gap-2">
                        <HiCheckCircle className="w-4 h-4 text-[#2563EB]" />
                        <span>100% Verified Doctors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HiShieldCheck className="w-4 h-4 text-[#0D9488]" />
                        <span>HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HiClock className="w-4 h-4 text-[#2563EB]" />
                        <span>Same-Day Appointments</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HiVideoCamera className="w-4 h-4 text-[#0D9488]" />
                        <span>Online &amp; In-Person</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span>4.9/5 Average Rating</span>
                    </div>
                </div>

            </div>
        </section>
    );
}