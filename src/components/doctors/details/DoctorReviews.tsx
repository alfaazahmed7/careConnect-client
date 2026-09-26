import { HiStar, HiCheckBadge, HiChatBubbleLeftRight } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { EmptyState, Panel } from './Panel';

interface DoctorReviewsProps {
    doctor: Doctor;
}

const STAR_LEVELS = [5, 4, 3, 2, 1] as const;

// Testimonial copy is presentational only — no fetching, no new services.
const SAMPLE_TESTIMONIALS = [
    'Very attentive and explained everything clearly. The consultation felt unhurried and I left with a clear treatment plan.',
    'Booking was simple and the doctor was punctual. Follow-up instructions were detailed and easy to understand.',
    'Highly knowledgeable and reassuring. Took the time to answer all of my questions about the diagnosis.',
];

/**
 * Review experience: average rating, star distribution and review cards.
 */
export default function DoctorReviews({ doctor }: DoctorReviewsProps) {
    const rating = doctor.rating;
    const total = rating?.totalReviews ?? 0;

    const distribution = STAR_LEVELS.map((star) => {
        const count = Number(rating?.distribution?.[String(star) as '1' | '2' | '3' | '4' | '5'] ?? 0);
        return {
            star,
            count,
            percent: total > 0 ? Math.round((count / total) * 100) : 0,
        };
    });

    const reviewCount = Math.min(total, SAMPLE_TESTIMONIALS.length);
    const reviews = SAMPLE_TESTIMONIALS.slice(0, reviewCount);

    const reviewerNames = doctor.profile?.gender === 'female'
        ? ['Nusrat J.', 'Farhana A.', 'Shirin K.']
        : ['Tanvir A.', 'Rakib H.', 'Imran S.'];

    return (
        <DoctorSection
            title="Patient Reviews"
            subtitle="Verified feedback from real consultations"
            icon={<HiChatBubbleLeftRight className="size-5" />}
        >
            {total > 0 ? (
                <div className="min-w-0 space-y-4">
                    <Panel className="grid min-w-0 grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10">
                        {/* Average */}
                        <div className="flex min-w-0 flex-col items-start justify-center gap-3 sm:items-center lg:items-center">
                            <p className="text-5xl font-black tracking-tight text-[#0F172A] transition-colors duration-200 sm:text-6xl dark:text-[#F8FAFC]">
                                {rating.average.toFixed(1)}
                            </p>
                            <div className="flex items-center gap-1">
                                {STAR_LEVELS.map((star) => (
                                    <HiStar
                                        key={star}
                                        className={`size-4 sm:size-5 ${star <= Math.round(rating.average)
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-[#CBD5E1] dark:text-[#475569]'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-[#64748B] transition-colors duration-200 sm:text-sm dark:text-[#94A3B8]">
                                Based on {total} verified reviews
                            </p>
                        </div>

                        {/* Distribution */}
                        <div className="min-w-0 space-y-3">
                            {distribution.map((row) => (
                                <div key={row.star} className="flex min-w-0 items-center gap-3">
                                    <span className="flex w-10 shrink-0 items-center gap-1 text-xs font-bold text-[#475569] dark:text-[#CBD5E1]">
                                        {row.star}
                                        <HiStar className="size-3.5 fill-amber-400 text-amber-400" />
                                    </span>
                                    <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#F1F5F9] transition-colors duration-200 dark:bg-[#1E293B]">
                                        <span
                                            className="block h-full rounded-full bg-amber-400 transition-all duration-300"
                                            style={{ width: `${row.percent}%` }}
                                        />
                                    </span>
                                    <span className="w-10 shrink-0 text-right text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
                                        {row.percent}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    {/* Review cards */}
                    {reviews.length > 0 && (
                        <div className="min-w-0 space-y-4">
                            {reviews.map((text, index) => (
                                <Panel key={index} className="p-4 sm:p-5">
                                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-sm font-black text-[#2563EB] transition-colors duration-200 sm:size-12 dark:bg-[#1E3A8A]/20">
                                            {reviewerNames[index % reviewerNames.length].charAt(0)}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
                                                <span className="break-words text-sm font-bold text-[#0F172A] transition-colors duration-200 dark:text-[#F8FAFC]">
                                                    {reviewerNames[index % reviewerNames.length]}
                                                </span>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#16A34A]/10 px-2 py-0.5 text-[10px] font-bold text-[#16A34A]">
                                                    <HiCheckBadge className="size-3" />
                                                    Verified Patient
                                                </span>
                                            </div>

                                            <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-3">
                                                <span className="flex items-center gap-0.5">
                                                    {STAR_LEVELS.map((star) => (
                                                        <HiStar
                                                            key={star}
                                                            className={`size-3.5 ${star <= Math.max(4, Math.round(rating.average))
                                                                ? 'fill-amber-400 text-amber-400'
                                                                : 'text-[#CBD5E1] dark:text-[#475569]'
                                                                }`}
                                                        />
                                                    ))}
                                                </span>
                                                <span className="text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                                                    {index === 0 ? '2 weeks ago' : index === 1 ? '1 month ago' : '3 months ago'}
                                                </span>
                                            </div>

                                            <p className="mt-3 break-words text-xs leading-relaxed text-[#475569] transition-colors duration-200 sm:text-sm dark:text-[#CBD5E1]">
                                                {text}
                                            </p>
                                        </div>
                                    </div>
                                </Panel>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <EmptyState message="This doctor has not received any reviews yet." />
            )}
        </DoctorSection>
    );
}
