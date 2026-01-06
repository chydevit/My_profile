import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { getProfile } from '@/lib/content';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Resend client initialized inside handler to avoid build errors if key is missing

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, subject, message } = result.data;
        const profile = getProfile();

        // Check if API key is configured
        if (!process.env.RESEND_API_KEY) {
            // Simulation mode for development without API key
            console.log('----------------------------------------');
            console.log('📧 Contact Form Submission (Simulation)');
            console.log(`From: ${name} <${email}>`);
            console.log(`Subject: ${subject}`);
            console.log(`Message: ${message}`);
            console.log('----------------------------------------');

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json({ success: true, message: 'Message sent successfully (simulated)' });
        }

        try {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const data = await resend.emails.send({
                from: 'Portfolio Contact <onboarding@resend.dev>', // Update this with your verified domain
                to: [profile.email], // Send to the profile owner
                replyTo: email,
                subject: `[Portfolio Contact] ${subject}`,
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              This email was sent from your portfolio website.
            </p>
          </div>
        `,
            });

            return NextResponse.json({ success: true, data });
        } catch (error) {
            console.error('Resend API Error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
