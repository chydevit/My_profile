"use client";

import { motion, useAnimationFrame, AnimatePresence, type PanInfo } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

// Icon components (Standardized SVG paths)

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

const Icons = {
    React: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.5" fill="none">
                <ellipse rx="10" ry="4.5" cx="12" cy="12" />
                <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
                <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
            </g>
        </svg>
    ),

    NextJS: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.122 17.562L12.5 11.45V17.5h-2.14V6.5h2.14l4.622 6.112V6.5h2.14v11.062h-2.14z"
            />
        </svg>
    ),

    TypeScript: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM11.5 8.75h6v1.875h-2.062v7.5h-1.875v-7.5H11.5V8.75zm9.375 5.438c.683.086 1.125.433 1.125 1.093 0 .741-.625 1.125-1.719 1.125-.562 0-1.078-.132-1.468-.328v1.64c.39.235 1.062.438 1.78.438 2.25 0 3.375-1.082 3.375-2.5 0-1.813-1.547-2.313-3.125-2.719-1.109-.266-1.5-.547-1.5-1.015 0-.469.39-.75 1.125-.75.765 0 1.343.203 1.718.421v-1.671c-.375-.203-.985-.375-1.75-.375-1.953 0-3.094 1.031-3.094 2.422 0 1.625 1.375 2.172 2.906 2.531 1.203.297 1.625.594 1.625 1.141z"
            />
        </svg>
    ),

    JavaScript: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
            />
        </svg>
    ),

    VSCode: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M23.15 2.587l-2.19-1.6L6.52 9l-3.37-2.438L0 9.44l15.15 11.562 5.812-4.24 2.188 1.61c.42.308.93.08.93-.41V2.997c0-.49-.51-.71-.93-.41zM18 16.27l-5.46-3.75L18 8.77v7.5z"
            />
        </svg>
    ),

    Vite: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path fill="currentColor" d="M19.85 1.14c-.11-.2-.36-.25-.53-.1L4.82 12.56a.4.4 0 0 0 .14.68l4.37.95-3.04 8.67a.4.4 0 0 0 .61.45L21.4 8.7a.4.4 0 0 0-.14-.68l-4.37-.95 2.96-6.03z" />
        </svg>
    ),

    NestJS: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm5.669 8.199c0 1.008-.456 1.974-1.251 2.607-.272.215-.572.392-.892.527V6.023l-3.551 2.812v8.118c-.469-.272-.884-.622-1.229-1.026.438-1.216 1.341-2.227 2.535-2.835 1.109-.567 2.373-.853 3.61-.853 1.258 0 2.443.292 3.428.853.511.291-.568.568-.568.568s-1.076-.568-1.785-.568c-1.109 0-2.115.309-2.924.853-.272.183-.517.397-.732.639-.345.389-.597.834-.732 1.314.157 1.547 1.451 2.766 3.018 2.766 1.567 0 2.861-1.219 3.018-2.766l.001-8.525c.001-.986-.454-1.93-1.248-2.561-.272-.217-.573-.396-.893-.532z" />
        </svg>
    ),

    Docker: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.119a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0 2.716h2.119a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-1.016 0-1.68.326-1.68.326-.025.011-.052.004-.07-.017a.086.086 0 01-.014-.08c.02-.057.065-.24.065-.503 0-1.178-.96-2.132-2.15-2.132-.05 0-.1.002-.15.007a2.13 2.13 0 00-1.077-1.353c-.33-.146-.684-.22-1.047-.22-.387 0-.765.084-1.11.238a2.15 2.15 0 00-1.802-.02 2.14 2.14 0 00-3.328 1.48 2.143 2.143 0 00-2.072 2.057c0 .132.012.261.036.386v1.652c0 .24.195.436.435.436h.63c.24 0 .435-.196.435-.436V9.006c0-.24.195-.436.435-.436h2.119c.24 0 .435.196.435.436v1.888c0 .24.195.436.435.436h2.12c.24 0 .435-.196.435-.436V9.006c0-.24.195-.436.435-.436h2.119c.24 0 .435.196.435.436v1.888c0 .24.195.436.435.436h2.119c.24 0 .435-.196.435-.436V9.28c0-1.026.837-1.883 1.865-1.883.332 0 .647.09.923.25.107.062.23.033.303-.067.06-.08.13-.23.13-.42 0-.44-.36-.833-.896-.92a.085.085 0 01-.072-.083.087.087 0 01.073-.086c1.137-.152 2.37.15 2.112 1.354-.012.056.02.112.072.136 1.134.52 1.94 1.144 2.176 1.76.012.032.046.046.077.032.062-.028.118-.046.17-.046.336 0 .616.27.616.602l-.005 5.518c0 .61-.502 1.104-1.12 1.104H1.127C.508 16.512 0 16.018 0 15.41l.004-2.85c0-.026.012-.05.033-.065.986-.714 2.454-.936 4.14-.383 1.486.49 2.766 1.258 4.238 1.168 1.436-.087 2.682-1.042 3.93-1.042 1.148 0 2.215.807 3.208 1.25.96.43 2.055.432 3.86-.464.03-.016.07-.01.096.015.706.7 1.558 1.09 2.404 1.09.28 0 .553-.043.812-.125 1.1-.347 1.635-1.168 1.635-1.168.016-.016.02-.04.01-.06-.015-.027-.374-.755-.597-.93"
            />
        </svg>
    ),

    Github: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
        </svg>
    ),

    // ✅ Added (common)
    Git: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M22.7 10.7 13.3 1.3a1 1 0 0 0-1.4 0L9.9 3.3l2.1 2.1a1.5 1.5 0 0 1 1.9 1.9l2.1 2.1a1.5 1.5 0 1 1-.9.9l-2-2v5.1a1.5 1.5 0 1 1-1.1 0V8.2a1.5 1.5 0 0 1-.8-2L9.1 4.1 1.3 11.9a1 1 0 0 0 0 1.4l9.4 9.4a1 1 0 0 0 1.4 0l10.6-10.6a1 1 0 0 0 0-1.4Z"
            />
        </svg>
    ),

    NPM: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M2 7v10h10v2h5v-2h5V7H2zm18 8h-2V9h2v6zM9 15H4V9h5v6zm3 0h-2V9h5v6h-3V11h-0v4z"
            />
        </svg>
    ),

    Bun: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.3 13.9c-.9 1.1-2.2 1.8-3.3 1.8s-2.4-.7-3.3-1.8c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 .7.9 1.7 1.5 2.6 1.5s1.9-.6 2.6-1.5c.2-.2.5-.2.7 0s.2.5 0 .7zM8.5 11c-.8 0-1.5-.7-1.5-1.5S7.7 8 8.5 8s1.5.7 1.5 1.5S9.3 11 8.5 11zm7 0c-.8 0-1.5-.7-1.5-1.5S14.7 8 15.5 8s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
            />
        </svg>
    ),

    PostgreSQL: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M12 2c-.015 0-.03 0-.045.002a8 8 0 0 0-4.04 1.258c-.011.006-.021.012-.032.018a1.5 1.5 0 0 0 .041 2.361c.451.341.97.55 1.52.613V9.5h3v-3.242c1.7.35 3 2.1 3 4.242 0 .08 0 .16-.002.24a1.5 1.5 0 0 0 .341 1.487c.3.336.72.502 1.15.502.43 0 .85-.166 1.15-.502a1.5 1.5 0 0 0 .341-1.487 7.94 7.94 0 0 0-6.424-6.242A8 8 0 0 0 12 2zM12 22a8 8 0 0 0 8.045-7.758c0-.08 0-.16-.002-.24a1.5 1.5 0 0 0-.341-1.487 1.5 1.5 0 0 0-2.3 0 1.5 1.5 0 0 0-.341 1.487 5 5 0 0 1-5 4.75h-0.24c-1.7-.35-3-2.1-3-4.242V10h-3v4.5c0 3.3 2.2 6.1 5.3 7.3A8 8 0 0 0 12 22z"
            />
        </svg>
    ),

    MySQL: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M7 18c.8-1.7 2.4-2.8 4.2-3.4 1.8-.6 3.5-1.1 4.4-2.6.8-1.3.5-2.8-.7-3.7-1-.7-2.1-.9-3.2-.7.8.4 1.3 1 1.5 1.7.3 1.2-.5 2.4-1.7 2.9-1.6.7-3.2.2-4.5-.9C5.8 10.2 5.4 8.2 6.3 6.6 7.4 4.7 9.7 3.8 12 4c3.4.3 6.4 2.8 6 6.4-.3 2.8-2.6 4.2-5 5.1-1.4.5-2.8.9-3.6 2.5H7z"
            />
        </svg>
    ),

    Firebase: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M6.1 20.2 12 3l5.9 17.2-5.9 3.3-5.9-3.3zm2.2-2 3.7 2.1 3.7-2.1L12 7.1 8.3 18.2z"
            />
        </svg>
    ),

    AWS: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M7.6 16.9c1.4 1 3.3 1.6 5.3 1.6 2.4 0 4.6-.8 6.2-2l.7.9c-1.9 1.6-4.5 2.6-6.9 2.6-2.3 0-4.4-.7-6-1.9l.7-1.2zM8.7 7.3h2.1v9H8.7v-9zm4.2 0H15v9h-2.1v-9z"
            />
        </svg>
    ),

    GoogleCloud: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M10.5 6.5a5.5 5.5 0 0 1 10.6 1.9A4.3 4.3 0 0 1 19.8 17H9.2A5.2 5.2 0 1 1 10.5 6.5zm.3 2a3.2 3.2 0 1 0-1.1 6.2h10.1a2.2 2.2 0 0 0 .3-4.3l-1-.1V9.3a3.5 3.5 0 0 0-6.7-1.3l-.4 1.1-1.2-.6z"
            />
        </svg>
    ),

    Prisma: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M20.2 17.2 12.6 2.7a1 1 0 0 0-1.8 0L3.8 16.9a1 1 0 0 0 .6 1.4l7.3 2.3a1 1 0 0 0 .6 0l7.3-2.1a1 1 0 0 0 .6-1.3zM12 18.9 6.4 17 11.7 6l.3 12.9z"
            />
        </svg>
    ),

    Stripe: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M13.7 10.2c-1.2-.5-2-.8-2-1.5 0-.6.5-1 1.5-1 1.1 0 2.4.3 3.3.8V5.1c-.9-.4-2.2-.7-3.6-.7-2.9 0-4.9 1.5-4.9 4 0 2.3 1.8 3.4 4 4.2 1.3.5 2.1.9 2.1 1.6 0 .7-.6 1.1-1.7 1.1-1.2 0-2.7-.4-3.8-1v3.6c1.1.5 2.7.9 4.2.9 3 0 5-1.4 5-4 0-2.3-1.4-3.4-4.1-4.6z"
            />
        </svg>
    ),

    Tailwind: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
            />
        </svg>
    ),

    NodeJS: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M12 0L2.4 5.5v11L12 22l9.6-5.5v-11L12 0zm0 2.5l7 4v8l-7 4-7-4v-8l7-4z"
            />
        </svg>
    ),

    Figma: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"
            />
        </svg>
    ),

    MongoDB: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M17.193 9.555c-1.137-3.725-3.23-5.69-5.12-8.555L12 11.652 11.927 1c-1.89 2.87-3.985 4.834-5.122 8.554C6.208 11.53 6 13.427 6 15.36 6 19.86 9.873 23 12 23s6-3.14 6-7.64c0-1.933-.208-3.83-.807-5.805z"
            />
        </svg>
    ),

    Android: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m11.4045-6.02l1.3971-2.4365c.1352-.2365.054-.537-.1824-.6722-.2364-.1356-.537-.0544-.6726.182l-1.4282 2.4908c-1.4243-.6557-3.0334-1.0189-4.7176-1.0263-1.6961.0074-3.3152.378-4.747 1.0401l-1.4266-2.4883c-.1353-.2366-.4362-.3179-.6726-.1821-.2365.1354-.3172.4362-.1821.6725l1.3941 2.4316c-3.1362 1.7335-5.1506 4.936-5.263 8.5638h17.3601c-.1066-3.6192-2.1132-6.8189-5.2592-8.552"
            />
        </svg>
    ),

    Java: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M11.642 21.056c-1.378 0-2.322-.057-3.024-.131.702.664 2.116 1.258 4.293 1.258 2.227 0 3.758-.696 4.381-1.25-.806.079-1.928.123-3.628.123h-2.022zm0-1.895c-2.38 0-4.045-.256-4.99-.481 1.05.748 3.12 1.411 6.095 1.411 2.924 0 4.932-.638 5.865-1.385-.93.209-2.617.455-4.881.455h-2.089zM19.68 15.22c.981.564 1.272 1.636.568 2.723-.559.851-1.69 1.139-2.527.796-.134-.055-.256-.126-.39-.187.319 1.146-1.722 2.253-6.611 2.253-4.526 0-7.398-1.087-7.462-2.316.326-1.025 2.112-2.327 7.072-2.327 2.053 0 3.424.238 4.697.591.603.167 1.187.327 1.766.327.914 0 1.579-.272 2.089-.861.346-.436.425-.972.197-1.397-.247-.384-.811-.634-1.314-.528-.433.091-1.127.327-1.636.327-.456 0-.878-.186-1.272-.654.545-.989 1.728-1.664 2.934-1.217 1.25.464 1.789 1.37 1.309 2.47zm-5.717-3.093c-.456.902-.8 2.373-1.458 2.373-.509 0-.8-1.583-.58-2.673.238-1.144.148-2.887-.148-3.414-.265-.472-1.344-1.144-1.579.16-.254 1.379.236 3.013-.236 3.254-.456.241-1.597-2.087-1.436-4.045.146-1.742 1.944-4.829 4.398-4.829 1.272 0 1.962 1.217 1.962 2.76 0 2.268-.617 5.12-1.478 6.414h.557v-.001zm-1.89-6.32c-.363 1.09-1.344 3.069-2.325 3.069-.654 0-.836-1.924-.654-2.76 1.017-3.923 4.29-2.07 2.979-.31z"
            />
        </svg>
    ),

    Kotlin: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M1.3 24l11.3-11.5L24 24zM0 0h12L0 12.5zM13.4 0L0 14v10l12-12L24 0z"
            />
        </svg>
    ),

    Python: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77V9.7l.01-.13.04-.26.1-.3.16-.33.25-.34.34-.35.45-.31.59-.3.73-.26.9-.2H16.7V2.56H9.75c-1.2 0-2.31.25-3.08.7-.76.44-1.33 1.08-1.62 1.83l-.1.35-.05.42-.01.4v2.73H2.56v10.13h4.62l-.01.13-.04.26-.1.3-.16.33-.25.34-.34.34-.45.32-.59.3-.73.26-.9.2H2.56v5.86h7.52c1.2 0 2.29-.25 3.06-.69.77-.44 1.34-1.09 1.63-1.84l.1-.35.04-.42.02-.4V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h4.52V9.71H14.25zm-2.43 1.95c.33 0 .61.12.83.34.23.23.35.5.35.82 0 .33-.12.61-.35.83-.22.23-.5.35-.83.35-.33 0-.61-.12-.83-.35-.23-.22-.35-.5-.35-.83 0-.32.12-.59.35-.82.22-.22.5-.34.83-.34zM7.22 19.5c.33 0 .61.12.83.34.23.22.35.5.35.83 0 .33-.12.61-.35.83-.22.22-.5.35-.83.35-.33 0-.61-.13-.83-.35-.23-.22-.35-.5-.35-.83 0-.33.12-.6.35-.83.22-.22.5-.34.83-.34z"
            />
        </svg>
    ),

    HTML: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
            />
        </svg>
    ),

    CSS: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
            />
        </svg>
    ),
};
const items = [
    { icon: Icons.React, color: "text-[#61DAFB]", glow: "shadow-[#61DAFB]/20", label: "React", description: "A JavaScript library for building user interfaces." },
    { icon: Icons.TypeScript, color: "text-[#3178C6]", glow: "shadow-[#3178C6]/20", label: "TypeScript", description: "Typed superset of JavaScript that compiles to plain JavaScript." },
    { icon: Icons.NextJS, color: "text-foreground", glow: "shadow-foreground/20", label: "Next.js", description: "React framework for production-grade applications." },
    { icon: Icons.VSCode, color: "text-[#007ACC]", glow: "shadow-[#007ACC]/20", label: "VS Code", description: "Powerful code editor with extensive extensions." },
    { icon: Icons.Docker, color: "text-[#2496ED]", glow: "shadow-[#2496ED]/20", label: "Docker", description: "Platform for developing and running applications in containers." },
    { icon: Icons.Github, color: "text-foreground", glow: "shadow-foreground/20", label: "GitHub", description: "Hosting platform for version control and collaboration." },
    { icon: Icons.JavaScript, color: "text-[#F7DF1E]", glow: "shadow-[#F7DF1E]/20", label: "JavaScript", description: "Versatile programming language for web development." },
    { icon: Icons.Tailwind, color: "text-[#38B2AC]", glow: "shadow-[#38B2AC]/20", label: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development." },
    { icon: Icons.NodeJS, color: "text-[#339933]", glow: "shadow-[#339933]/20", label: "Node.js", description: "JavaScript runtime built on Chrome's V8 engine." },
    { icon: Icons.Figma, color: "text-[#F24E1E]", glow: "shadow-[#F24E1E]/20", label: "Figma", description: "Collaborative interface design tool." },
    { icon: Icons.MongoDB, color: "text-[#47A248]", glow: "shadow-[#47A248]/20", label: "MongoDB", description: "NoSQL database program using JSON-like documents." },
    { icon: Icons.Android, color: "text-[#3DDC84]", glow: "shadow-[#3DDC84]/20", label: "Android", description: "Mobile operating system based on Linux." },
    { icon: Icons.Java, color: "text-[#F89820]", glow: "shadow-[#F89820]/20", label: "Java", description: "High-level, class-based, object-oriented ecosystem." },
    { icon: Icons.Kotlin, color: "text-[#7F52FF]", glow: "shadow-[#7F52FF]/20", label: "Kotlin", description: "Cross-platform, statically typed, general-purpose language." },
    { icon: Icons.Python, color: "text-[#3776AB]", glow: "shadow-[#3776AB]/20", label: "Python", description: "High-level, general-purpose programming language." },
    { icon: Icons.HTML, color: "text-[#E34F26]", glow: "shadow-[#E34F26]/20", label: "HTML5", description: "Standard markup language for building web pages." },
    { icon: Icons.CSS, color: "text-[#1572B6]", glow: "shadow-[#1572B6]/20", label: "CSS3", description: "Style sheet language for styling HTML documents." },
    { icon: Icons.Vite, color: "text-[#646CFF]", glow: "shadow-[#646CFF]/20", label: "Vite", description: "Next generation front-end tooling designed for speed." },
    { icon: Icons.NestJS, color: "text-[#E0234E]", glow: "shadow-[#E0234E]/20", label: "NestJS", description: "Progressive Node.js framework for server-side apps." },
    { icon: Icons.Bun, color: "text-[#FBF0BA]", glow: "shadow-[#FBF0BA]/20", label: "Bun", description: "Fast all-in-one JavaScript runtime." },
    { icon: Icons.PostgreSQL, color: "text-[#336791]", glow: "shadow-[#336791]/20", label: "PostgreSQL", description: "Powerful, open source object-relational database." },
    { icon: Icons.Git, color: "text-[#F05032]", glow: "shadow-[#F05032]/20", label: "Git", description: "Distributed version control system." },
];

interface TechStackProps {
    onBack?: () => void;
}

export function TechStack({ onBack }: TechStackProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const containerRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState(190);
    const [isCompactLayout, setIsCompactLayout] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [selectedTech, setSelectedTech] = useState<typeof items[0] | null>(null);
    const [hoveredTech, setHoveredTech] = useState<typeof items[0] | null>(null);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
    const [isPointerActive, setIsPointerActive] = useState(false);

    // Size the sphere from the rendered container so tablet/mobile stay inside bounds.
    useEffect(() => {
        const updateLayout = () => {
            const container = containerRef.current;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const compactLayout = viewportWidth < 1024;
            const touchDevice = window.matchMedia("(pointer: coarse)").matches;
            const minSize = Math.min(
                container?.clientWidth ?? viewportWidth,
                container?.clientHeight ?? viewportHeight,
            );

            let nextRadius = 190;
            if (viewportWidth < 400) {
                nextRadius = Math.min(88, minSize * 0.34);
            } else if (viewportWidth < 640) {
                nextRadius = Math.min(108, minSize * 0.36);
            } else if (viewportWidth < 1024) {
                nextRadius = Math.min(138, minSize * 0.38);
            } else {
                nextRadius = Math.min(190, minSize * 0.4);
            }

            setRadius(Math.max(72, nextRadius));
            setIsCompactLayout(compactLayout || viewportHeight < 760);
            setIsTouchDevice(touchDevice);
        };

        updateLayout();

        const observer = new ResizeObserver(() => updateLayout());
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        window.addEventListener("resize", updateLayout);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateLayout);
        };
    }, []);

    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const velocity = useRef({ x: 0, y: 0 });

    // Auto-rotation with inertia
    useAnimationFrame((t, delta) => {
        if (isDragging) return;

        const pointerInfluenceX = isPointerActive ? pointerPosition.y * 0.003 : 0;
        const pointerInfluenceY = isPointerActive ? pointerPosition.x * 0.003 : 0;

        // Decay velocity
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;

        // Combined constant rotation + inertia
        setRotation(prev => ({
            x: prev.x + (delta * 0.002) + (velocity.current.x * delta * 0.0001) + pointerInfluenceX,
            y: prev.y + (delta * 0.002) + (velocity.current.y * delta * 0.0001) + pointerInfluenceY
        }));
    });

    const updatePointerPosition = (clientX: number, clientY: number, element: HTMLDivElement) => {
        const bounds = element.getBoundingClientRect();
        const x = clientX - (bounds.left + bounds.width / 2);
        const y = clientY - (bounds.top + bounds.height / 2);

        setPointerPosition({ x, y });
        setIsPointerActive(true);
    };

    const handleDrag = (_: PointerEvent, info: PanInfo) => {
        if (isCompactLayout || isTouchDevice) return;
        setRotation(prev => ({
            x: prev.x + info.delta.y * 0.1,
            y: prev.y + info.delta.x * 0.1
        }));
    };

    const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
        if (isCompactLayout || isTouchDevice) {
            setIsDragging(false);
            return;
        }
        setIsDragging(false);
        velocity.current = { x: info.velocity.y, y: info.velocity.x };
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (isCompactLayout || event.pointerType !== "mouse") return;
        updatePointerPosition(event.clientX, event.clientY, event.currentTarget);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") {
            resetPointerState();
            return;
        }
        updatePointerPosition(event.clientX, event.clientY, event.currentTarget);
    };

    const resetPointerState = () => {
        setIsPointerActive(false);
        setPointerPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`group relative h-full w-full overflow-hidden ${isCompactLayout ? "touch-auto" : "cursor-grab touch-pan-y active:cursor-grabbing"}`}
            onClick={(e) => {
                if (onBack) {
                    e.stopPropagation();
                    onBack();
                }
            }}
            onPan={handleDrag}
            onPanStart={() => {
                if (isCompactLayout || isTouchDevice) return;
                setIsDragging(true);
            }}
            onPanEnd={handleDragEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                resetPointerState();
                setHoveredTech(null);
            }}
            onPointerCancel={() => {
                resetPointerState();
                setHoveredTech(null);
            }}
            onPointerUp={() => {
                resetPointerState();
                setHoveredTech(null);
            }}
        >
            {/* Central Logo/Icon (Optional - User's logo or just empty space) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Animated Central Node */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-opacity duration-300 sm:h-14 sm:w-14 md:h-16 md:w-16 ${hoveredTech && !selectedTech ? "opacity-0" : "opacity-100"}`}
                >
                    <div className="h-6 w-6 rounded-full bg-primary-500/50 blur-md sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </motion.div>
            </div>

            <AnimatePresence>
                {hoveredTech && !selectedTech && !isCompactLayout && (
                    <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.94 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="pointer-events-none absolute left-1/2 top-1/2 z-40 w-[min(92%,24rem)] -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="rounded-[2rem] border border-white/10 bg-background/70 px-4 py-5 text-center shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-6 sm:py-7">
                            <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 sm:h-16 sm:w-16 ${hoveredTech.color}`}>
                                <hoveredTech.icon className="h-8 w-8 drop-shadow-[0_0_18px_currentColor] sm:h-9 sm:w-9" />
                            </div>
                            <p className={`mb-2 text-sm font-medium tracking-[0.18em] uppercase ${hoveredTech.color}`}>
                                Tech Stack
                            </p>
                            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                {hoveredTech.label}
                            </h3>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                                {hoveredTech.description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Icons */}
            {isMounted && items.map((item, index) => {
                const phi = Math.acos(-1 + (2 * index) / items.length);
                const theta = Math.sqrt(items.length * Math.PI) * phi;

                // Convert spherical to Cartesian coordinates
                const x0 = radius * Math.cos(theta) * Math.sin(phi);
                const y0 = radius * Math.sin(theta) * Math.sin(phi);
                const z0 = radius * Math.cos(phi);

                // Apply rotation
                const degToRad = Math.PI / 180;
                const rotX = rotation.x * degToRad;
                const rotY = rotation.y * degToRad;

                // Rotate around X-axis
                const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
                const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);

                // Rotate around Y-axis
                const x2 = x0 * Math.cos(rotY) + z1 * Math.sin(rotY);
                const z2 = -x0 * Math.sin(rotY) + z1 * Math.cos(rotY);

                // Perspective projection
                const scale = (z2 + radius * 2) / (radius * 3);
                const opacity = Math.max(0.1, (z2 + radius) / (radius * 2));
                const zIndex = Math.floor(z2 + radius);
                const blur = Math.max(0, (radius - z2) * 0.02); // Depth blur
                const distanceFromPointer = Math.hypot(pointerPosition.x - x2, pointerPosition.y - y1);
                const hoverStrength = !isCompactLayout && isPointerActive ? Math.max(0, 1 - distanceFromPointer / 140) : 0;
                const interactiveScale = scale + hoverStrength * 0.22;
                const interactiveY = y1 - hoverStrength * 14;
                const interactiveOpacity = Math.min(1, opacity + hoverStrength * 0.35);

                return (
                    <div
                        key={index}
                        className={`absolute top-1/2 left-1/2 ${item.color} flex flex-col items-center justify-center`}
                        style={{
                            transform: `translate(calc(-50% + ${x2}px), calc(-50% + ${interactiveY}px)) scale(${interactiveScale})`,
                            opacity: interactiveOpacity,
                            zIndex: zIndex,
                            filter: `blur(${blur}px)`,
                        }}
                    >
                        <div 
                            className={`relative group rounded-2xl p-1.5 transition-all duration-500 ${isCompactLayout ? "cursor-default" : "cursor-pointer hover:bg-white/5"} sm:p-2 md:p-4`}
                            onMouseEnter={() => {
                                if (isCompactLayout) return;
                                setHoveredTech(item);
                            }}
                            onMouseLeave={() => {
                                if (isCompactLayout) return;
                                setHoveredTech((current) => current?.label === item.label ? null : current);
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                if (!isCompactLayout && e.pointerType === "mouse") {
                                    setHoveredTech(item);
                                }
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isCompactLayout) return;
                                setSelectedTech(item);
                            }}
                            role="button"
                            tabIndex={isCompactLayout ? -1 : 0}
                            onKeyDown={(e) => {
                                if (isCompactLayout) return;
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedTech(item);
                                }
                            }}
                            style={{
                                backgroundColor: hoverStrength > 0 ? `rgb(255 255 255 / ${0.04 + hoverStrength * 0.1})` : undefined,
                            }}
                        >
                            <item.icon
                                className={`h-7 w-7 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 sm:h-9 sm:w-9 ${isCompactLayout ? "md:h-11 md:w-11" : "md:h-16 md:w-16"} group-hover:scale-110`}
                                style={{
                                    transform: `scale(${1 + hoverStrength * 0.18})`,
                                    filter: `drop-shadow(0 0 ${15 + hoverStrength * 18}px currentColor)`,
                                }}
                            />
                            
                            {/* Glow Effect */}
                            <div
                                className={`absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity bg-current`}
                                style={{ opacity: 0.2 + hoverStrength * 0.45 }}
                            />
                        </div>
                    </div>
                );
            })}

            {/* Click hint */}
            {onBack && !selectedTech && (
                <div className="pointer-events-none absolute bottom-4 left-0 right-0 hidden text-center lg:block">
                    <p className="text-xs text-muted-foreground animate-bounce">Click surrounding space to return</p>
                </div>
            )}

            {/* Selected Tech Detail Overlay */}
            <AnimatePresence>
                {selectedTech && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[1000] flex cursor-default items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTech(null);
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={`relative flex max-h-[90svh] w-full max-w-sm flex-col items-center gap-5 overflow-y-auto rounded-3xl border border-foreground/10 bg-background p-6 pt-12 shadow-2xl sm:p-8 sm:pt-12 ${selectedTech.glow} cursor-auto`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTech(null);
                                }}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-foreground/5 cursor-pointer z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                            
                            <div className={`${selectedTech.color} p-4 rounded-2xl bg-foreground/5`}>
                                <selectedTech.icon className="h-20 w-20 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] sm:h-24 sm:w-24" />
                            </div>
                            
                            <div className="text-center space-y-3">
                                <h3 className={`text-3xl font-bold ${selectedTech.color}`}>{selectedTech.label}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {selectedTech.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
