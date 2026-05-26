'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/components/providers/LanguageProvider';

type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

interface ContactFormProps {
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useLanguage();

    const contactSchema = useMemo(
        () =>
            z.object({
                name: z.string().min(2, t('errorName')),
                email: z.string().email(t('errorEmail')),
                subject: z.string().min(5, t('errorSubject')),
                message: z.string().min(10, t('errorMessage')),
            }),
        [t]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            setSubmitStatus('success');
            reset();

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className={className}
        >
            <div className="space-y-6">
                <Input
                    label={t('formName')}
                    type="text"
                    placeholder={t('formNamePlaceholder')}
                    error={errors.name?.message}
                    {...register('name')}
                />

                <Input
                    label={t('formEmail')}
                    type="email"
                    placeholder={t('formEmailPlaceholder')}
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label={t('formSubject')}
                    type="text"
                    placeholder={t('formSubjectPlaceholder')}
                    error={errors.subject?.message}
                    {...register('subject')}
                />

                <Textarea
                    label={t('formMessage')}
                    placeholder={t('formMessagePlaceholder')}
                    rows={6}
                    error={errors.message?.message}
                    {...register('message')}
                />

                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800"
                    >
                        <CheckCircle2 size={20} />
                        <p className="text-sm font-medium">
                            {t('messageSentSuccess')}
                        </p>
                    </motion.div>
                )}

                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800"
                    >
                        <AlertCircle size={20} />
                        <p className="text-sm font-medium">{errorMessage}</p>
                    </motion.div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            {t('sending')}
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            {t('sendMessage')}
                        </>
                    )}
                </Button>
            </div>
        </motion.form>
    );
};

export default ContactForm;
