'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiQuestionMarkCircle, HiChevronDown } from 'react-icons/hi2';
import { Doctor } from '@/types/Doctor';
import DoctorSection from './Section';
import { Panel } from './Panel';

interface DoctorFaqProps {
    doctor: Doctor;
}

/**
 * FAQ accordion styled with the CareConnect surface language.
 * Answers adapt to the doctor's own preferences and availability values.
 */
export default function DoctorFaq({ doctor }: DoctorFaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const { preferences, availability, professional, payment, profile } = doctor;

    const duration = availability?.appointmentDurationMinutes;
    const advance = availability?.advanceBookingDays;
    const cancellation = availability?.minimumCancellationNoticeHours;
    const followUpFee = professional?.followUpFee;

    const consultationLabels: Record<string, string> = {
        in_person: 'in-person clinic visits',
        video: 'secure video consultations',
        audio: 'audio-only phone consultations',
    };
    const consultationTypes = (professional?.consultationTypes ?? [])
        .map((type) => consultationLabels[type])
        .filter(Boolean);

    const paymentMethods = (payment?.paymentMethods ?? []).map((method) =>
        method === 'mobile_banking' ? 'mobile banking' : 'card'
    );

    const faqs = [
        {
            question: 'Which consultation types are available?',
            answer: consultationTypes.length > 0
                ? `This doctor offers ${consultationTypes.join(', ')}. You can choose the format that suits you while booking.`
                : 'Consultation types for this doctor will be published shortly.',
        },
        {
            question: 'How do I book an appointment?',
            answer: duration && advance
                ? `Use the Book Appointment button, choose an available slot within the next ${advance} days, and confirm. Each consultation lasts about ${duration} minutes.`
                : 'Use the Book Appointment button to choose a slot from the weekly availability calendar and confirm your visit.',
        },
        {
            question: 'What is the cancellation policy?',
            answer: cancellation
                ? `Please cancel or reschedule at least ${cancellation} hours before your appointment to avoid any disruption or charges.`
                : 'Cancellations can be made from your appointments dashboard before your scheduled slot.',
        },
        {
            question: 'Do you offer follow-up consultations?',
            answer: followUpFee && (followUpFee.inPerson || followUpFee.video || followUpFee.audio)
                ? `Yes. Follow-up consultations are available at a reduced fee starting from ৳${followUpFee.inPerson ?? followUpFee.video ?? followUpFee.audio}.`
                : 'Follow-up consultations are available — the doctor will advise the best schedule after your first visit.',
        },
        {
            question: 'How can I pay for my consultation?',
            answer: paymentMethods.length > 0
                ? `Payments are accepted via ${paymentMethods.join(' and ')} in ${payment?.currency || professional?.consultationFee?.currency || 'BDT'}.`
                : `Payment is collected securely in ${professional?.consultationFee?.currency || 'BDT'} at the time of booking.`,
        },
        preferences?.acceptingNewPatients
            ? {
                question: 'Are new patients being accepted right now?',
                answer: `Yes — ${profile?.fullName || 'this doctor'} is currently accepting new patients.${preferences?.autoConfirmAppointments ? ' Appointments are confirmed instantly at booking.' : ''}`,
            }
            : null,
    ].filter(Boolean) as { question: string; answer: string }[];


    return (
        <DoctorSection
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before booking"
            icon={<HiQuestionMarkCircle className="size-5" />}
        >
            <div className="min-w-0 space-y-3">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <Panel key={faq.question} className="overflow-hidden rounded-xl">
                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                aria-expanded={isOpen}
                                className="flex w-full min-w-0 items-center justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-[#F8FAFC] sm:p-5 dark:hover:bg-[#1E293B]/50"
                            >
                                <span className="min-w-0 break-words text-sm font-bold text-[#0F172A] transition-colors duration-200 sm:text-base dark:text-[#F8FAFC]">
                                    {faq.question}
                                </span>
                                <HiChevronDown
                                    className={`size-5 shrink-0 text-[#2563EB] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="border-t border-[#E2E8F0] p-4 text-xs leading-relaxed text-[#64748B] transition-colors duration-200 sm:p-5 sm:text-sm dark:border-[#334155] dark:text-[#94A3B8]">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Panel>
                    );
                })}
            </div>
        </DoctorSection>
    );
}
