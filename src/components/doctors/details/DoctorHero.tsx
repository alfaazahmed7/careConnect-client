'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    HiCheckBadge,
    HiStar,
    HiMapPin,
    HiBriefcase,
    HiLanguage,
    HiCheckCircle,
    HiVideoCamera,
    HiPhone,
    HiUserGroup,
    HiCalendarDays,
    HiChatBubbleLeftRight,
} from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';

const CONSULTATION_CHIPS: Record<
    string,
    { label: string; icon: React.ReactNode }
> = {
    video: { label: 'Video Consultation', icon: <HiVideoCamera className="size-3.5" /> },
    audio: { label: 'Audio Consultation', icon: <HiPhone className="size-3.5" /> },
    in_person: { label: 'In Person', icon: <HiMapPin className="size-3.5" /> },
};

const BADGE_STYLES: Record<string, string> = {
    verified: 'border-[#2563EB]/20 bg-[#EFF6FF] text-[#2563EB] dark:border-[#2563EB]/30 dark:bg-[#1E3A8A]/20',
    top_rated: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    experienced: 'border-[#0D9488]/20 bg-[#0D9488]/10 text-[#0D9488]',
};

function badgeStyle(type: string, index: number) {
    const known = BADGE_STYLES[type?.toLowerCase().replace(/[\s-]/g, '_')];
    if (known) return known;
    const fallbacks = [
        'border-[#2563EB]/20 bg-[#EFF6FF] text-[#2563EB] dark:border-[#2563EB]/30 dark:bg-[#1E3A8A]/20',
        'border-[#0D9488]/20 bg-[#0D9488]/10 text-[#0D9488]',
        'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    ];
    return fallbacks[index % fallbacks.length];
}

const FALLBACK_COVER = 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1600&q=80';
const FALLBACK_AVATAR = 'https://healingdiagnostic.com/uploads/doctors/20240923062604.png';

interface DoctorHeroProps {
    doctor: Doctor;
}

/**
 * Premium identity header. Cover card + overlapping circular avatar on the left,
 * CTA actions underneath. The booking card is injected by the page on the right.
 */
export default function DoctorHero({ doctor }: DoctorHeroProps) {
    const { profile, professional, verification, rating, badges } = doctor;

    const primarySpecialty =
        professional.specialties?.find((s) => s.isPrimary)?.name ||
        professional.specialties?.[0]?.name;

    const location = profile.location;
    const locationText = [location?.area, location?.city].filter(Boolean).join(', ');
    const fullLocation = [
        location?.city,
        location?.division,
        location?.country,
    ].filter(Boolean).join(', ');

    const coverImage = profile.coverImage || FALLBACK_COVER;
    const avatarImage = profile.profileImage || FALLBACK_AVATAR;

    const consultationChips = (professional.consultationTypes ?? [])
        .filter((type) => CONSULTATION_CHIPS[type])
        .map((type) => ({ key: type, ...CONSULTATION_CHIPS[type] }));

    const languages = (profile.languages ?? []).filter(Boolean);
    const badgeList = (badges ?? []).filter((badge) => badge?.label);


    return (
        <div className="min-w-0 space-y-5">
            {/* Cover + overlapping avatar */}
            <div className="relative">
                <div className="relative h-[150px] w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#EFF6FF] transition-colors duration-200 sm:h-[200px] lg:h-[240px] dark:border-[#334155] dark:bg-[#1E293B]">
                    <Image
                        src={coverImage}
                        alt={`${profile.fullName} cover`}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 via-transparent to-transparent" />
                </div>

                <div className="relative -mt-14 flex items-end gap-4 px-4 sm:-mt-16 sm:gap-5 sm:px-6">
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-[#F1F5F9] shadow-xl transition-colors duration-200 sm:size-32 dark:border-[#111827] dark:bg-[#1E293B]">
                        <Image
                            src={avatarImage}
                            alt={profile.fullName}
                            fill
                            priority
                            sizes="128px"
                            className="object-cover"
                        />
                    </div>

                    {verification?.status === 'verified' && (
                        <span className="mb-2 inline-flex max-w-full items-center gap-1.5 truncate rounded-full border border-[#2563EB]/20 bg-white px-3 py-1.5 text-[11px] font-bold text-[#2563EB] shadow-xs transition-colors duration-200 sm:text-xs dark:border-[#2563EB]/30 dark:bg-[#111827]">
                            <HiCheckBadge className="size-4 shrink-0" />
                            Verified Doctor
                        </span>
                    )}
                </div>
            </div>

            {/* Identity stack */}
            <div className="px-4 sm:px-6">
                <h1 className="break-words text-2xl font-black leading-tight tracking-tight text-[#0F172A] transition-colors duration-200 sm:text-3xl lg:text-4xl dark:text-[#F8FAFC]">
                    {profile.fullName}
                </h1>

                {(profile.professionalTitle || primarySpecialty) && (
                    <p className="mt-1.5 break-words text-sm font-semibold text-[#475569] transition-colors duration-200 sm:text-base dark:text-[#CBD5E1]">
                        {[profile.professionalTitle, primarySpecialty].filter(Boolean).join(' • ')}
                    </p>
                )}

                <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#64748B] transition-colors duration-200 sm:text-sm dark:text-[#94A3B8]">
                    {rating?.average > 0 && (
                        <span className="flex items-center gap-1.5">
                            <HiStar className="size-4 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                {rating.average.toFixed(1)}
                            </span>
                            <span>({rating.totalReviews} reviews)</span>
                        </span>
                    )}

                    {professional.experience?.years > 0 && (
                        <span className="flex items-center gap-1.5">
                            <HiBriefcase className="size-4 text-[#0D9488]" />
                            {professional.experience.years}+ years experience
                        </span>
                    )}

                    {(locationText || fullLocation) && (
                        <span className="flex min-w-0 items-center gap-1.5">
                            <HiMapPin className="size-4 shrink-0 text-[#0D9488]" />
                            <span className="break-words">{locationText || fullLocation}</span>
                        </span>
                    )}
                </div>

                {badgeList.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {badgeList.map((badge, index) => (
                            <span
                                key={`${badge.type}-${index}`}
                                className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold transition-colors duration-200 sm:text-xs ${badgeStyle(badge.type, index)}`}
                            >
                                <HiCheckCircle className="size-3.5 shrink-0" />
                                <span className="break-words">{badge.label}</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Consultation chips */}
                {consultationChips.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {consultationChips.map((chip) => (
                            <span
                                key={chip.key}
                                className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#475569] transition-colors duration-200 sm:text-xs dark:border-[#334155] dark:bg-[#111827] dark:text-[#CBD5E1]"
                            >
                                <span className="text-[#2563EB]">{chip.icon}</span>
                                {chip.label}
                            </span>
                        ))}
                    </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <div className="mt-4 min-w-0">
                        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                            <HiLanguage className="size-4" />
                            Languages
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {languages.map((language) => (
                                <span
                                    key={language}
                                    className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-semibold text-[#475569] transition-colors duration-200 dark:bg-[#1E293B] dark:text-[#CBD5E1]"
                                >
                                    {language}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Accepting new patients */}
                {doctor.preferences?.acceptingNewPatients && (
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#16A34A]/10 px-3 py-1.5 text-[11px] font-bold text-[#16A34A] sm:text-xs">
                        <HiUserGroup className="size-4 shrink-0" />
                        Accepting new patients
                    </span>
                )}

                {/* CTA buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href={`/doctors/${doctor.seo?.slug || doctor._id}/book`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#1D4ED8] hover:shadow-md active:scale-[0.99] sm:w-auto sm:min-w-[200px]"
                    >
                        <HiCalendarDays className="size-5" />
                        Book Appointment
                    </Link>

                    {doctor.preferences?.allowPatientMessages && (
                        <Link
                            href={`/doctors/${doctor.seo?.slug || doctor._id}/message`}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] px-6 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors duration-200 hover:bg-[#F1F5F9] sm:w-auto sm:min-w-[180px] dark:border-[#334155] dark:text-[#F8FAFC] dark:hover:bg-[#1E293B]"
                        >
                            <HiChatBubbleLeftRight className="size-5" />
                            Message Doctor
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
