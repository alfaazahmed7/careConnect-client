'use client';

import { useState, useMemo } from 'react';
import DoctorCard from './DoctorCard';
import {
    HiMagnifyingGlass,
    HiMapPin,
    HiAdjustmentsHorizontal,
    HiStar,
    HiFunnel
} from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';

interface DoctorSearchClientProps {
    initialDoctors: Doctor[];
}

export default function DoctorSearchClient({ initialDoctors }: DoctorSearchClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
    const [minRating, setMinRating] = useState<number>(0);
    const [consultationType, setConsultationType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('recommended');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Extract unique specialties for sidebar options
    const specialties = useMemo(() => {
        const list = new Set<string>();
        initialDoctors.forEach((doc) => {
            doc.professional.specialties.forEach((s) => list.add(s.name));
        });
        return ['All', ...Array.from(list)];
    }, [initialDoctors]);

    // Filtering Logic without Frontend Sorting (Sorting will be handled via Backend API)
    const filteredDoctors = useMemo(() => {
        return initialDoctors.filter((doctor) => {
            // Name / Specialty / Condition match
            const matchesSearch =
                searchQuery === '' ||
                doctor.profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.professional.specialties.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                doctor.professional.subSpecialties.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));

            // Location match
            const matchesLocation =
                locationQuery === '' ||
                doctor.profile.location.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
                doctor.profile.location.area.toLowerCase().includes(locationQuery.toLowerCase());

            // Specialty filter
            const matchesSpecialty =
                selectedSpecialty === 'All' ||
                doctor.professional.specialties.some((s) => s.name === selectedSpecialty);

            // Rating filter
            const matchesRating = doctor.rating ? doctor.rating.average >= minRating : true;

            // Consultation type filter
            const matchesType =
                consultationType === 'all' ||
                doctor.professional.consultationTypes.includes(consultationType);

            return matchesSearch && matchesLocation && matchesSpecialty && matchesRating && matchesType;
        });
    }, [initialDoctors, searchQuery, locationQuery, selectedSpecialty, minRating, consultationType]);

    const resetFilters = () => {
        setSearchQuery('');
        setLocationQuery('');
        setSelectedSpecialty('All');
        setMinRating(0);
        setConsultationType('all');
        setSortBy('recommended');
    };

    return (
        <div className="space-y-8">
            {/* Top Search Bar */}
            <div className="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

                    {/* Main Search Input */}
                    <div className="md:col-span-6 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] focus-within:border-[#2563EB] transition-colors">
                        <HiMagnifyingGlass className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search doctor name, specialty, or condition..."
                            className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] focus:outline-none"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="md:col-span-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] focus-within:border-[#2563EB] transition-colors">
                        <HiMapPin className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                        <input
                            type="text"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            placeholder="City or state..."
                            className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] focus:outline-none"
                        />
                    </div>

                    {/* Mobile Filter Toggle Button */}
                    <div className="md:col-span-2 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]"
                        >
                            <HiFunnel className="w-5 h-5 text-[#2563EB]" />
                            <span>Filters</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Sidebar Filters */}
                <aside className={`lg:col-span-3 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-5 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                    <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#334155]">
                        <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                            <HiAdjustmentsHorizontal className="w-5 h-5 text-[#2563EB]" />
                            <span>Filters</span>
                        </div>
                        <button
                            onClick={resetFilters}
                            className="text-xs font-semibold text-[#2563EB] hover:underline"
                        >
                            Reset All
                        </button>
                    </div>

                    {/* Specialty Filter */}
                    <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                            Specialty
                        </h4>
                        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                            {specialties.map((spec) => (
                                <label
                                    key={spec}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] cursor-pointer text-sm text-[#0F172A] dark:text-[#CBD5E1]"
                                >
                                    <span className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="specialty"
                                            checked={selectedSpecialty === spec}
                                            onChange={() => setSelectedSpecialty(spec)}
                                            className="text-[#2563EB] focus:ring-[#2563EB]"
                                        />
                                        {spec}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0] dark:border-[#334155]">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                            Minimum Rating
                        </h4>
                        <div className="space-y-1">
                            {[4.5, 4.0, 3.5, 0].map((rate) => (
                                <label
                                    key={rate}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] cursor-pointer text-sm text-[#0F172A] dark:text-[#CBD5E1]"
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={minRating === rate}
                                        onChange={() => setMinRating(rate)}
                                        className="text-[#2563EB] focus:ring-[#2563EB]"
                                    />
                                    {rate === 0 ? (
                                        'Any rating'
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            {rate}+ <HiStar className="w-4 h-4 text-amber-400 fill-amber-400 inline" />
                                        </span>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Consultation Type Filter */}
                    <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0] dark:border-[#334155]">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                            Consultation Type
                        </h4>
                        <div className="space-y-1">
                            {[
                                { label: 'Any Type', value: 'all' },
                                { label: 'Video Consultation', value: 'video' },
                                { label: 'In-Person Visit', value: 'in_person' },
                                { label: 'Audio Call', value: 'audio' },
                            ].map((type) => (
                                <label
                                    key={type.value}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] cursor-pointer text-sm text-[#0F172A] dark:text-[#CBD5E1]"
                                >
                                    <input
                                        type="radio"
                                        name="consultationType"
                                        checked={consultationType === type.value}
                                        onChange={() => setConsultationType(type.value)}
                                        className="text-[#2563EB] focus:ring-[#2563EB]"
                                    />
                                    {type.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Doctor Results Area */}
                <main className="lg:col-span-9 space-y-6">

                    {/* Results Header with Sorting Dropdown (State Ready) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-4 shadow-sm">
                        <div>
                            <h2 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                {filteredDoctors.length} doctors found
                            </h2>
                            <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                                Showing available verified medical specialists
                            </p>
                        </div>

                        {/* Sort Control */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium shrink-0">
                                Sort by:
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            >
                                <option value="recommended">Recommended</option>
                                <option value="rating">Highest Rated</option>
                                <option value="experience">Most Experienced</option>
                                <option value="fee_low">Lowest Fee</option>
                                <option value="fee_high">Highest Fee</option>
                            </select>
                        </div>
                    </div>

                    {/* Cards Grid: 2 per row on full big screen */}
                    {filteredDoctors.length > 0 ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            {filteredDoctors.map((doctor) => (
                                <DoctorCard key={doctor._id} doctor={doctor} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-12 text-center space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] flex items-center justify-center text-2xl font-bold">
                                ?
                            </div>
                            <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                No doctors match your criteria
                            </h3>
                            <p className="text-sm text-[#64748B] dark:text-[#94A3B8] max-w-md mx-auto">
                                Try adjusting your search terms, changing the specialty, or resetting filters to explore more doctors.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}