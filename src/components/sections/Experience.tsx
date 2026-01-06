import { Container } from '@/components/ui/Container';
import Timeline from '@/components/features/Timeline';
import { getExperience, getEducation } from '@/lib/content';

export function Experience() {
    const experience = getExperience();
    const education = getEducation();
    const allItems = [...experience, ...education];

    return (
        <section id="experience" className="py-20 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        My professional journey and academic background.
                    </p>
                </div>

                <Timeline items={allItems} />
            </Container>
        </section>
    );
}
