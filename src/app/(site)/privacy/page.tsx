import { Container } from "@/components/ui/Container";

export const metadata = {
    title: "Privacy Policy - Chy Devit",
    description: "Privacy policy for the personal portfolio website of Chy Devit.",
};

export default function PrivacyPage() {
    return (
        <section className="py-20 lg:py-32">
            <Container size="md">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
                    <p>
                        This website is a personal portfolio. I value your privacy and only collect
                        minimal data necessary to understand website traffic and improve the user experience.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Analytics</h2>
                    <p>
                        I use Vercel Analytics to track website usage. This service may collect data
                        such as your IP address (anonymized), device type, and the pages you visit.
                        This information is used solely for traffic analysis and does not identify
                        you personally.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Contact Form</h2>
                    <p>
                        Information submitted through the contact form (name, email, message) is used
                        only to respond to your inquiries. I do not share or sell this data to third parties.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Your Rights</h2>
                    <p>
                        If you have any questions about this privacy policy, feel free to contact me.
                    </p>

                    <p className="pt-12 text-sm italic">
                        Modified: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </Container>
        </section>
    );
}
