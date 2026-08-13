'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorCard from './DoctorCard';
import { Doctor } from '@/types/Doctor';
import {
    HiMagnifyingGlass,
    HiMapPin,
    HiAdjustmentsHorizontal,
    HiStar,
    HiChevronUp,
    HiChevronDown,
    HiSparkles,
    HiArrowTrendingDown,
    HiArrowTrendingUp,
    HiBriefcase,
    HiVideoCamera,
    HiCheck,
    HiFunnel,
    HiXMark
} from 'react-icons/hi2';

interface DoctorSearchClientProps {
    initialDoctors: Doctor[];
}

export default function DoctorSearchClient({ initialDoctors }: DoctorSearchClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [consultationType, setConsultationType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('recommended');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Accordion Expand/Collapse States
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        specialty: true,
        rating: true,
        consultation: true,
    });

    const sortDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSection = (key: string) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSpecialty = (name: string) => {
        setSelectedSpecialties((prev) =>
            prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
        );
    };

    // Extract unique specialties & dynamic counts
    const specialtyCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        initialDoctors.forEach((doc) => {
            doc.professional.specialties.forEach((s) => {
                counts[s.name] = (counts[s.name] || 0) + 1;
            });
        });
        return counts;
    }, [initialDoctors]);

    // Filtering Logic without Frontend Sorting (Sorting handled via Backend API)
    const filteredDoctors = useMemo(() => {
        return initialDoctors.filter((doctor) => {
            const matchesSearch =
                searchQuery === '' ||
                doctor.profile.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.professional.specialties.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                doctor.professional.subSpecialties.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesLocation =
                locationQuery === '' ||
                doctor.profile.location.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
                doctor.profile.location.area.toLowerCase().includes(locationQuery.toLowerCase());

            const matchesSpecialty =
                selectedSpecialties.length === 0 ||
                doctor.professional.specialties.some((s) => selectedSpecialties.includes(s.name));

            const matchesRating = doctor.rating ? doctor.rating.average >= minRating : true;

            const matchesType =
                consultationType === 'all' ||
                doctor.professional.consultationTypes.includes(consultationType);

            return matchesSearch && matchesLocation && matchesSpecialty && matchesRating && matchesType;
        });
    }, [initialDoctors, searchQuery, locationQuery, selectedSpecialties, minRating, consultationType]);

    const resetFilters = () => {
        setSearchQuery('');
        setLocationQuery('');
        setSelectedSpecialties([]);
        setMinRating(0);
        setConsultationType('all');
        setSortBy('recommended');
    };

    // Strict sorting options requested in documentation
    const sortOptions = [
        { id: 'recommended', label: 'Recommended', icon: HiSparkles },
        { id: 'rating', label: 'Highest Rated', icon: HiStar },
        { id: 'experience', label: 'Most Experienced', icon: HiBriefcase },
        { id: 'fee_low', label: 'Lowest Fee', icon: HiArrowTrendingDown },
        { id: 'fee_high', label: 'Highest Fee', icon: HiArrowTrendingUp },
    ];

    const currentSortOption = sortOptions.find((opt) => opt.id === sortBy) || sortOptions[0];

    return (
        <div className="space-y-6">

            {/* Header Search Bar Component */}
            <div className="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-full p-2 shadow-xs transition-all duration-200 focus-within:ring-2 focus-within:ring-[#2563EB]/20">
                <div className="flex flex-col md:flex-row items-center gap-2">

                    <div className="flex-1 flex items-center gap-3 px-4 py-2.5 w-full">
                        <HiMagnifyingGlass className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by doctor name, specialty, or condition..."
                            className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] focus:outline-none"
                        />
                    </div>

                    <div className="hidden md:block w-px h-8 bg-[#E2E8F0] dark:bg-[#334155]" />

                    <div className="flex-1 flex items-center gap-3 px-4 py-2.5 w-full">
                        <HiMapPin className="w-5 h-5 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                        <input
                            type="text"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            placeholder="City or state..."
                            className="w-full bg-transparent text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] focus:outline-none"
                        />
                    </div>

                    <div className="w-full md:w-auto flex items-center gap-2 px-1">
                        <button
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            className="lg:hidden flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]"
                        >
                            <HiFunnel className="w-4 h-4 text-[#2563EB]" />
                            <span>Filters</span>
                        </button>

                        <button
                            type="button"
                            className="w-full md:w-auto px-7 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>

            {/* Main Grid: Sidebar + Doctor List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Filter Sidebar Accordions */}
                <aside
                    className={`lg:col-span-3 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl overflow-hidden shadow-xs ${isMobileFilterOpen ? 'block' : 'hidden lg:block'
                        }`}
                >
                    <div className="p-4 border-b border-[#E2E8F0] dark:border-[#334155] flex items-center justify-between bg-[#F8FAFC] dark:bg-[#1E293B]/50">
                        <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                            <HiAdjustmentsHorizontal className="w-5 h-5 text-[#2563EB]" />
                            <span>Filters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={resetFilters}
                                className="text-xs font-medium text-[#2563EB] hover:underline"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="lg:hidden text-[#64748B] hover:text-[#0F172A]"
                            >
                                <HiXMark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="divide-y divide-[#E2E8F0] dark:divide-[#334155]/60">

                        {/* Specialty Section - Small Box with Custom Scrollbar */}
                        <div className="p-4">
                            <button
                                onClick={() => toggleSection('specialty')}
                                className="w-full flex items-center justify-between text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider"
                            >
                                <span className="flex items-center gap-2">
                                    <HiBriefcase className="w-4 h-4 text-[#64748B]" />
                                    Specialty
                                </span>
                                {openSections.specialty ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
                            </button>

                            <AnimatePresence>
                                {openSections.specialty && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mt-3"
                                    >
                                        <div className="max-h-44 overflow-y-auto pr-1.5 space-y-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700">
                                            {Object.entries(specialtyCounts).map(([name, count]) => {
                                                const isChecked = selectedSpecialties.includes(name);
                                                return (
                                                    <label
                                                        key={name}
                                                        onClick={() => toggleSpecialty(name)}
                                                        className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] cursor-pointer text-xs text-[#334155] dark:text-[#CBD5E1] transition-colors"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#CBD5E1] dark:border-[#475569]'}`}>
                                                                {isChecked && <HiCheck className="w-2.5 h-2.5 text-white" />}
                                                            </div>
                                                            <span className={isChecked ? 'font-semibold text-[#0F172A] dark:text-white' : ''}>{name}</span>
                                                        </div>
                                                        <span className="text-[11px] text-[#94A3B8] font-medium">{count}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Minimum Rating Section */}
                        <div className="p-4">
                            <button
                                onClick={() => toggleSection('rating')}
                                className="w-full flex items-center justify-between text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider"
                            >
                                <span className="flex items-center gap-2">
                                    <HiStar className="w-4 h-4 text-[#64748B]" />
                                    Minimum Rating
                                </span>
                                {openSections.rating ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
                            </button>

                            <AnimatePresence>
                                {openSections.rating && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mt-3 space-y-1"
                                    >
                                        {[
                                            { rate: 4.5, label: '4.5+ stars' },
                                            { rate: 4.0, label: '4.0+ stars' },
                                            { rate: 3.5, label: '3.5+ stars' },
                                            { rate: 0, label: 'Any rating' },
                                        ].map(({ rate, label }) => {
                                            const isSelected = minRating === rate;
                                            return (
                                                <div
                                                    key={rate}
                                                    onClick={() => setMinRating(rate)}
                                                    className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] cursor-pointer text-xs text-[#334155] dark:text-[#CBD5E1]"
                                                >
                                                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#2563EB]' : 'border-[#CBD5E1] dark:border-[#475569]'}`}>
                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />}
                                                    </div>
                                                    <span className={isSelected ? 'font-bold text-[#2563EB]' : ''}>{label}</span>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Consultation Type Section */}
                        <div className="p-4">
                            <button
                                onClick={() => toggleSection('consultation')}
                                className="w-full flex items-center justify-between text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider"
                            >
                                <span className="flex items-center gap-2">
                                    <HiVideoCamera className="w-4 h-4 text-[#64748B]" />
                                    Consultation Type
                                </span>
                                {openSections.consultation ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
                            </button>

                            <AnimatePresence>
                                {openSections.consultation && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden mt-3 space-y-1"
                                    >
                                        {[
                                            { id: 'all', label: 'Any Type' },
                                            { id: 'video', label: 'Online Only' },
                                            { id: 'in_person', label: 'In-Person Only' },
                                        ].map(({ id, label }) => {
                                            const isSelected = consultationType === id;
                                            return (
                                                <div
                                                    key={id}
                                                    onClick={() => setConsultationType(id)}
                                                    className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] cursor-pointer text-xs text-[#334155] dark:text-[#CBD5E1]"
                                                >
                                                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#2563EB]' : 'border-[#CBD5E1] dark:border-[#475569]'}`}>
                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />}
                                                    </div>
                                                    <span className={isSelected ? 'font-bold text-[#2563EB]' : ''}>{label}</span>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </aside>

                {/* Doctor Cards Area & Top Header */}
                <main className="lg:col-span-9 space-y-6">

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                <span className="text-[#2563EB]">{filteredDoctors.length}</span> doctors found
                            </p>
                        </div>

                        {/* Custom Sort Dropdown Component */}
                        <div className="relative" ref={sortDropdownRef}>
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#2563EB]/30 bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] text-xs font-bold shadow-xs hover:border-[#2563EB] transition-all"
                            >
                                <currentSortOption.icon className="w-4 h-4 text-[#2563EB]" />
                                <span>{currentSortOption.label}</span>
                                {isSortOpen ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
                            </button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl shadow-xl z-30 py-2 overflow-hidden"
                                    >
                                        {sortOptions.map((option) => {
                                            const Icon = option.icon;
                                            const isSelected = option.id === sortBy;
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => {
                                                        setSortBy(option.id);
                                                        setIsSortOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-colors ${isSelected
                                                            ? 'bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB]'
                                                            : 'text-[#475569] dark:text-[#CBD5E1] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                                                        <span>{option.label}</span>
                                                    </div>
                                                    {isSelected && <HiCheck className="w-4 h-4 text-[#2563EB]" />}
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Cards Grid Component */}
                    {filteredDoctors.length > 0 ? (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            <AnimatePresence mode="popLayout">
                                {filteredDoctors.map((doctor) => (
                                    <DoctorCard key={doctor._id} doctor={doctor} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-12 text-center space-y-4 shadow-xs"
                        >
                            <div className="w-14 h-14 mx-auto rounded-full bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] flex items-center justify-center font-bold text-xl">
                                ?
                            </div>
                            <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                No doctors matched your criteria
                            </h3>
                            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto">
                                Try adjusting your search terms or clear existing filters to see available specialists.
                            </p>
                            <button
                                onClick={resetFilters}
                                className="px-5 py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </motion.div>
                    )}

                </main>
            </div>
        </div>
    );
}