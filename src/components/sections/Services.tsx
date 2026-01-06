"use client";

import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Laptop } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { getServices } from "@/lib/content";

const iconMap = {
    code: Code,
    palette: Palette,
    smartphone: Smartphone,
    laptop: Laptop,
};

export function Services() {
    const services = getServices();

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
        <section id="services" className="py-20 bg-muted/30">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Services <span className="gradient-text">I Offer</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        I work together with my team to deliver exceptional digital solutions
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service) => {
                        const Icon = iconMap[service.icon as keyof typeof iconMap];

                        return (
                            <motion.div key={service.id} variants={itemVariants}>
                                <Card
                                    variant="elevated"
                                    hover
                                    className="h-full group"
                                >
                                    <CardHeader>
                                        {/* Icon */}
                                        <div className="mb-4 p-4 bg-gradient-to-br from-primary-600 to-accent-purple rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Title */}
                                        <CardTitle className="group-hover:text-primary-600 transition-colors">
                                            {service.title}
                                        </CardTitle>

                                        {/* Description */}
                                        <CardDescription className="mt-2">
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        {/* Features List */}
                                        <ul className="space-y-2">
                                            {service.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                                >
                                                    <span className="text-primary-600 mt-1">✓</span>
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
