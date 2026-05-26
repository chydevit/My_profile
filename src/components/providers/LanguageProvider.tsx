"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "km";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        welcome: "Welcome!",
        welcomeMessage: "Thank you for visiting my portfolio. I'm excited to share my work and journey with you.",
        explore: "Explore Portfolio",
        myPortfolio: "My Portfolio",
        projects: "Projects",
        about: "About",
        contact: "Contact",
        greeting: "Hello, I'm",
        role: "Web Developer",
        description: "I build modern web applications.",
        viewProjects: "View Projects",
        contactMe: "Contact Me",
        home: "Home",
        skills: "Skills",
        blog: "Blog",
        lightMode: "Light Mode",
        darkMode: "Dark Mode",
        helloIam: "Hello, I Am",
        hireMe: "Hire Me",
        viewCV: "View CV",
        scrollDown: "Scroll Down",
        scrollUp: "Scroll Up",
        heroDescription: "Experienced frontend developer with a passion for creating visually stunning and user-friendly websites",
        role_software: "Software Development",
        role_mobile: "Mobile Developer",
        role_web: "Web Developer",
        role_vibe: "Vibe Coding",
        footerDescription: "Web Developer passionate about creating beautiful, functional, and user-friendly websites.",
        quickLinks: "Quick Links",
        connect: "Connect",
        allRightsReserved: "All rights reserved.",
        // About
        hello: "Hello",
        aboutTitle: "I'm {name}, Software Developer from Phnom Penh, Cambodia.",
        email: "Email",
        phone: "Phone",
        address: "Address",
        downloadCV: "Download CV",
        // Skills
        mySkills: "My Skills",
        skillsDescription: "Technologies and tools I work with to bring ideas to life",
        all: "All",
        // Experience
        experienceEducation: "Experience & Education",
        experienceDescription: "My professional journey and academic background.",
        // Projects
        featuredProjects: "Featured Projects",
        projectsDescription: "A showcase of my recent work and personal projects",
        viewAllProjects: "View All Projects",
        comingSoon: "Coming soon",
        details: "Details",
        viewLive: "View Live",
        // Services
        servicesOffer: "Services I Offer",
        servicesDescription: "I work together with my team to deliver exceptional digital solutions",
        // ContactCTA
        letsWorkTogether: "Let's Work Together",
        contactDescription: "Have a project in mind? I'm always open to discussing new opportunities, creative ideas, or partnerships.",
        getInTouch: "Get In Touch",
        messageTelegram: "Message on Telegram",
        clientTestimonials: "Client Testimonials",
        testimonialsDescription: "What others say about working with me",
        // Contact page
        getInTouchTitle: "Get In Touch",
        getInTouchTitleStart: "Get In",
        getInTouchTitleHighlight: "Touch",
        getInTouchDescription: "Have a project in mind or just want to chat? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.",
        contactInformation: "Contact Information",
        location: "Location",
        connectWithMe: "Connect With Me",
        responseTime: "Response Time",
        responseTimeDescription: "I typically respond within 24-48 hours during business days. For urgent matters, feel free to reach out via phone or social media.",
        sendMeMessage: "Send Me a Message",
        formName: "Name",
        formEmail: "Email",
        formSubject: "Subject",
        formMessage: "Message",
        formNamePlaceholder: "John Doe",
        formEmailPlaceholder: "john@example.com",
        formSubjectPlaceholder: "What's this about?",
        formMessagePlaceholder: "Tell me more...",
        sendMessage: "Send Message",
        sending: "Sending...",
        messageSentSuccess: "Message sent successfully! I'll get back to you soon.",
        errorName: "Name must be at least 2 characters",
        errorEmail: "Please enter a valid email address",
        errorSubject: "Subject must be at least 5 characters",
        errorMessage: "Message must be at least 10 characters"
    },
    km: {
        welcome: "សូមស្វាគមន៍!",
        welcomeMessage: "សូមអរគុណសម្រាប់ការទស្សនាផលប័ត្ររបស់ខ្ញុំ។ ខ្ញុំពិតជារំភើបដែលបានចែករំលែកការងារ និងដំណើររបស់ខ្ញុំជាមួយអ្នក។",
        explore: "ស្វែងយល់ពីផលប័ត្រ",
        myPortfolio: "ផលប័ត្ររបស់ខ្ញុំ",
        projects: "គម្រោង",
        about: "អំពីខ្ញុំ",
        contact: "ទំនាក់ទំនង",
        greeting: "សួស្តី, ខ្ញុំគឺ",
        role: "អ្នកអភិវឌ្ឍន៍វេបសាយ",
        description: "ខ្ញុំបង្កើតកម្មវិធីវេបសាយទំនើប។",
        viewProjects: "មើលគម្រោង",
        contactMe: "ទាក់ទងខ្ញុំ",
        home: "ទំព័រដើម",
        skills: "ជំនាញ",
        blog: "ប្លុក",
        lightMode: "ម៉ូដពន្លឺ",
        darkMode: "ម៉ូដងងឹត",
        helloIam: "សួស្តី, ខ្ញុំគឺ",
        hireMe: "ជួលខ្ញុំ",
        viewCV: "មើលប្រវត្តិរូប",
        scrollDown: "អូសចុះក្រោម",
        scrollUp: "Scroll Up",
        heroDescription: "អ្នកអភិវឌ្ឍន៍ Frontend ដែលមានបទពិសោធន៍ និងមានក្តីស្រឡាញ់ក្នុងការបង្កើតវេបសាយដែលស្អាត និងងាយស្រួលប្រើ",
        role_software: "ការអភិវឌ្ឍន៍កម្មវិធី",
        role_mobile: "អ្នកអភិវឌ្ឍន៍កម្មវិធីទូរស័ព្ទ",
        role_web: "អ្នកអភិវឌ្ឍន៍វេបសាយ",
        role_vibe: "Vibe Coding",
        footerDescription: "អ្នកអភិវឌ្ឍន៍វេបសាយដែលចូលចិត្តបង្កើតវេបសាយស្អាត មានមុខងារ និងងាយស្រួលប្រើ។",
        quickLinks: "តំណភ្ជាប់រហ័ស",
        connect: "ទំនាក់ទំនង",
        allRightsReserved: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
        // About
        hello: "សួស្តី",
        aboutTitle: "ខ្ញុំគឺ {name}, អ្នកអភិវឌ្ឍន៍កម្មវិធីកុំព្យូទ័រមកពីភ្នំពេញ, កម្ពុជា។",
        email: "អ៊ីមែល",
        phone: "ទូរស័ព្ទ",
        address: "អាសយដ្ឋាន",
        downloadCV: "ទាញយកប្រវត្តិរូប",
        // Skills
        mySkills: "ជំនាញរបស់ខ្ញុំ",
        skillsDescription: "បច្ចេកវិទ្យា និងឧបករណ៍ដែលខ្ញុំប្រើដើម្បីធ្វើឱ្យគំនិតក្លាយជាការពិត",
        all: "ទាំងអស់",
        // Experience
        experienceEducation: "បទពិសោធន៍ និងការសិក្សា",
        experienceDescription: "ដំណើរជីវិតការងារ និងប្រវត្តិការសិក្សារបស់ខ្ញុំ។",
        // Projects
        featuredProjects: "គម្រោងលេចធ្លោ",
        projectsDescription: "ការបង្ហាញអំពីការងារថ្មីៗ និងគម្រោងផ្ទាល់ខ្លួនរបស់ខ្ញុំ",
        viewAllProjects: "មើលគម្រោងទាំងអស់",
        comingSoon: "នឹងមកដល់ឆាប់ៗ",
        details: "ព័ត៌មានលម្អិត",
        viewLive: "មើលផ្ទាល់",
        // Services
        servicesOffer: "សេវាកម្មដែលខ្ញុំផ្តល់ជូន",
        servicesDescription: "ខ្ញុំធ្វើការជាមួយក្រុមរបស់ខ្ញុំដើម្បីផ្តល់ជូនដំណោះស្រាយឌីជីថលដ៏ល្អបំផុត",
        // ContactCTA
        letsWorkTogether: "តោះធ្វើការជាមួយគ្នា",
        contactDescription: "មានគម្រោងក្នុងចិត្តទេ? ខ្ញុំតែងតែបើកចំហដើម្បីពិភាក្សាអំពីឱកាសថ្មីៗ គំនិតច្នៃប្រឌិត ឬភាពជាដៃគូ។",
        getInTouch: "ទំនាក់ទំនង",
        messageTelegram: "ផ្ញើសារតាម Telegram",
        clientTestimonials: "សក្ខីកម្មអតិថិជន",
        testimonialsDescription: "អ្វីដែលអ្នកដទៃនិយាយអំពីការធ្វើការជាមួយខ្ញុំ",
        // Contact page
        getInTouchTitle: "ទាក់ទងមកខ្ញុំ",
        getInTouchTitleStart: "ទាក់ទង",
        getInTouchTitleHighlight: "មកខ្ញុំ",
        getInTouchDescription: "មានគម្រោងក្នុងចិត្តទេ ឬចង់និយាយជជែកប្រាប់ខ្ញុំ? ខ្ញុំចង់ឮពីអ្នកណាស់។ សូមបំពេញទម្រង់ខាងក្រោម ហើយខ្ញុំនឹងឆ្លើយតបទៅអ្នកវិញឱ្យបានឆាប់បំផុត។",
        contactInformation: "ព័ត៌មានទំនាក់ទំនង",
        location: "ទីតាំង",
        connectWithMe: "ភ្ជាប់ជាមួយខ្ញុំ",
        responseTime: "រយៈពេលឆ្លើយតប",
        responseTimeDescription: "ជាធម្មតាខ្ញុំឆ្លើយតបក្នុងរយៈពេល ២៤-៤៨ ម៉ោងនៅថ្ងៃធ្វើការ។ សម្រាប់រឿងបន្ទាន់ សូមទាក់ទងតាមទូរស័ព្ទ ឬប្រព័ន្ធផ្សព្វផ្សាយសង្គម។",
        sendMeMessage: "ផ្ញើសារមកខ្ញុំ",
        formName: "ឈ្មោះ",
        formEmail: "អ៊ីមែល",
        formSubject: "ប្រធានបទ",
        formMessage: "សារ",
        formNamePlaceholder: "ឈ្មោះរបស់អ្នក",
        formEmailPlaceholder: "you@example.com",
        formSubjectPlaceholder: "តើនេះអំពីអ្វី?",
        formMessagePlaceholder: "ប្រាប់ខ្ញុំបន្ថែម...",
        sendMessage: "ផ្ញើសារ",
        sending: "កំពុងផ្ញើ...",
        messageSentSuccess: "បានផ្ញើសារដោយជោគជ័យ! ខ្ញុំនឹងឆ្លើយតបទៅអ្នកវិញឆាប់ៗ។",
        errorName: "ឈ្មោះត្រូវមានយ៉ាងតិច ២ តួអក្សរ",
        errorEmail: "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ",
        errorSubject: "ប្រធានបទត្រូវមានយ៉ាងតិច ៥ តួអក្សរ",
        errorMessage: "សារត្រូវមានយ៉ាងតិច ១០ តួអក្សរ"
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "preferred-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored === "en" || stored === "km") {
                setLanguageState(stored);
            }
        } catch {
            // ignore (SSR / disabled storage)
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        try {
            window.localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // ignore
        }
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: (key: string) => translations[language][key] || key,
            }}
        >
            <div className={language === 'km' ? 'khmer-font' : ''}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
