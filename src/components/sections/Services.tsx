"use client";

import { motion } from "framer-motion";
import { Check, Code, Palette, Smartphone, Laptop } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { getServices } from "@/lib/content";
import { useLanguage } from "@/components/providers/LanguageProvider";

const iconMap = {
    code: Code,
    palette: Palette,
    smartphone: Smartphone,
    laptop: Laptop,
};

export function Services() {
    const services = getServices();
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="services" className="bg-muted/30 py-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-heading font-bold sm:text-4xl md:text-5xl">
                        <span className="gradient-text">{t("servicesOffer")}</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        {t("servicesDescription")}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                    {services.map((service) => {
                        const Icon = iconMap[service.icon as keyof typeof iconMap];

                        return (
                            <motion.div key={service.id} variants={itemVariants}>
                                <Card variant="elevated" hover className="h-full group">
                                    <CardHeader>
                                        <div className="mb-4 w-fit rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-4 transition-transform duration-300 group-hover:scale-110">
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>

                                        <CardTitle className="transition-colors group-hover:text-primary-600">
                                            {service.title}
                                        </CardTitle>

                                        <CardDescription className="mt-2">
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                                >
                                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Container>
        </section>
    );
}
