'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    HiCheckCircle,
    HiStar,
    HiMapPin,
    HiBriefcase,
    HiClock
} from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';

interface DoctorCardProps {
    doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    const primarySpecialty = doctor.professional.specialties.find((s) => s.isPrimary)?.name
        || doctor.professional.specialties[0]?.name
        || 'General Practitioner';

    const primaryDegree = doctor.education[0]?.degree || '';
    const institution = doctor.education[0]?.institution || '';

    const startingFee = doctor.professional.consultationFee.video
        || doctor.professional.consultationFee.inPerson
        || doctor.professional.consultationFee.audio;

    const doctorSlug = doctor.seo?.slug || doctor._id;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="group bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] dark:hover:border-[#2563EB] rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
            <div>
                <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#334155] relative bg-[#F1F5F9] dark:bg-[#1E293B]">
                            <Image
                                src={doctor.profile.profileImage ?? 'https://healingdiagnostic.com/uploads/doctors/20240923062604.png'}
                                alt={doctor.profile.fullName}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#16A34A] border-2 border-white dark:border-[#111827] rounded-full" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate group-hover:text-[#2563EB] transition-colors">
                                    {doctor.profile.fullName}
                                </h3>
                                {doctor.verification.status === 'verified' && (
                                    <HiCheckCircle className="w-5 h-5 text-[#2563EB] shrink-0" />
                                )}
                            </div>

                            {doctor.rating && (
                                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold shrink-0">
                                    <HiStar className="w-4 h-4 fill-amber-400" />
                                    <span>{doctor.rating.average.toFixed(1)}</span>
                                    <span className="text-[#64748B] dark:text-[#94A3B8] font-normal">({doctor.rating.totalReviews})</span>
                                </div>
                            )}
                        </div>

                        <p className="text-sm font-semibold text-[#2563EB] mt-0.5">
                            {primarySpecialty}
                        </p>

                        {primaryDegree && (
                            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
                                {primaryDegree} {institution ? `• ${institution}` : ''}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#475569] dark:text-[#CBD5E1]">
                            <div className="flex items-center gap-1">
                                <HiBriefcase className="w-4 h-4 text-[#0D9488]" />
                                <span>{doctor.professional.experience.years} yrs exp</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <HiMapPin className="w-4 h-4 text-[#0D9488]" />
                                <span>
                                    {doctor.profile.location
                                        ? `${doctor.profile.location.area}, ${doctor.profile.location.city}`
                                        : "Location not available"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {doctor.professional.subSpecialties && doctor.professional.subSpecialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {doctor.professional.subSpecialties.slice(0, 3).map((sub, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1E293B] dark:text-[#CBD5E1]"
                            >
                                {sub}
                            </span>
                        ))}
                        {doctor.professional.subSpecialties.length > 3 && (
                            <span className="px-2 py-1 rounded-md text-xs font-medium bg-[#F1F5F9] text-[#64748B] dark:bg-[#1E293B] dark:text-[#94A3B8]">
                                +{doctor.professional.subSpecialties.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#334155]/60 flex items-center gap-2 text-xs text-[#16A34A] font-medium">
                    <HiClock className="w-4 h-4 shrink-0" />
                    <span>Next Available: Today, 5:00 PM</span>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E2E8F0] dark:border-[#334155] flex items-center justify-between gap-3">
                <div>
                    <span className="text-xs text-[#64748B] dark:text-[#94A3B8] block">Consultation Fee</span>
                    <p className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                        ৳{startingFee}{' '}
                        <span className="text-xs font-normal text-[#64748B] dark:text-[#94A3B8]">/ visit</span>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href={`/doctors/${doctorSlug}`}
                        className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
                    >
                        View Profile
                    </Link>
                    <Link
                        href={`/doctors/${doctorSlug}/book`}
                        className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}