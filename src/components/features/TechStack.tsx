"use client";

import { motion, useAnimationFrame } from "framer-motion";
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.33 16.42L16.67 6.34l-1.25-.92-8.67 11.92h2.58zm-2.08-1.75l-1.09-1.5c-1.12 2.37-1.12 5.16 0 7.53l1.09-6.03zm10.5-3.34l1.09 1.5c1.12-2.37 1.12-5.16 0-7.53l-1.09 6.03z"
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
                d="M0 0v24h24V0H0zm22.034 18.276c-.175 1.095-.888 2.015-3.003 2.873-.736.345-1.554.585-1.797 1.14-.091.33-.105.51-.046.705.15.646.915.84 1.515.66.39-.12.75-.42.976-.9 1.034.676 1.034.676 1.755 1.125.27.42.404.601.586.78.63.705 1.469 1.065 2.834 1.034l.705-.089c.676-.165 1.32-.525 1.71-1.005 1.14-1.291.811-3.541-.569-4.471-1.365-1.02-3.361-1.244-3.616-2.205-.24-1.17.87-1.545 1.966-1.41.811.18 1.26.586 1.755 1.336l1.83-1.051c-.21-.48-.45-.689-.81-1.109-1.74-1.756-6.09-1.666-6.871 1.004-.029.09-.24.705-.074 1.65l-.046-.067zm-8.983 7.245h2.248c0-1.938.009-3.864.009-5.805 0-1.232-.063-2.363.138-2.711.33-.689 1.18-.601 1.566-.48.396.196.597.466.83.855.063.105.11.196.127.196l1.825-1.125c-.305-.63-.75-1.172-1.324-1.517-.855-.51-2.004-.675-3.207-.405-.783.226-1.458.691-1.811 1.411-.51.93-.402 2.07-.397 3.346-.012 2.054 0 4.109 0 6.179l-.004.056z"
            />
        </svg>
    ),

    VSCode: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M23.15 2.587l-2.19 1.6L6.52 9l-3.37-2.44L0 9.44l15.15 11.56 5.81-4.24 2.19 1.61c.42.3.93.08.93-.41V2.997c0-.49-.51-.71-.93-.41zM5.52 14.72L3 17.06l3.52 2.54 5.31-3.86-6.31-1.02zm-2.37-5.04l2.37 2.36 6.31-1.02-5.31-3.86-3.37 2.54z"
            />
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
                d="M12 2c5.6 0 10 3.6 10 8.1 0 6.2-4.7 11.9-10 11.9S2 16.3 2 10.1C2 5.6 6.4 2 12 2zm-3.2 9.1c.6 0 1.1-.5 1.1-1.1S9.4 8.9 8.8 8.9 7.7 9.4 7.7 10s.5 1.1 1.1 1.1zm6.4 0c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1-1.1.5-1.1 1.1.5 1.1 1.1 1.1zM8.7 14.7c.9.9 2 1.3 3.3 1.3s2.4-.4 3.3-1.3a.8.8 0 1 0-1.1-1.1c-.6.6-1.4.9-2.2.9s-1.6-.3-2.2-.9a.8.8 0 1 0-1.1 1.1z"
            />
        </svg>
    ),

    PostgreSQL: (props: IconProps) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            {props.title ? <title>{props.title}</title> : null}
            <path
                fill="currentColor"
                d="M12 2c4.9 0 7.8 2.4 7.8 6.4 0 2.4-1 4.4-2.8 5.7.1.8.1 1.8-.2 2.8-.7 2.5-2.6 5.1-4.8 5.1-2.1 0-3.7-2.3-4.5-4.6-.5-1.4-.6-2.9-.4-4.2C5.1 11.9 4.2 10.2 4.2 8.4 4.2 4.4 7.1 2 12 2zm-3.5 9.5c.7.3 1.5.4 2.5.4s1.8-.1 2.5-.4c.4-.2.9 0 1 .5.1.4-.1.9-.5 1-1 .4-2 .6-3 .6s-2-.2-3-.6a.8.8 0 1 1 .5-1.5z"
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
                d="M12 12c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0-6c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3-3-3 1.343-3 3zM6 12c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zM6 6c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zM6 18c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3V18z"
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
    { icon: Icons.React, color: "text-[#61DAFB]", label: "React" },
    { icon: Icons.TypeScript, color: "text-[#3178C6]", label: "TypeScript" },
    { icon: Icons.NextJS, color: "text-foreground", label: "Next.js" },
    { icon: Icons.VSCode, color: "text-[#007ACC]", label: "VS Code" },
    { icon: Icons.Docker, color: "text-[#2496ED]", label: "Docker" },
    { icon: Icons.Github, color: "text-foreground", label: "GitHub" },
    { icon: Icons.JavaScript, color: "text-[#F7DF1E]", label: "JavaScript" },
    { icon: Icons.Tailwind, color: "text-[#38B2AC]", label: "Tailwind CSS" },
    { icon: Icons.NodeJS, color: "text-[#339933]", label: "Node.js" },
    { icon: Icons.Figma, color: "text-[#F24E1E]", label: "Figma" },
    { icon: Icons.MongoDB, color: "text-[#47A248]", label: "MongoDB" },
    { icon: Icons.Android, color: "text-[#3DDC84]", label: "Android" },
    { icon: Icons.Java, color: "text-[#F89820]", label: "Java" },
    { icon: Icons.Kotlin, color: "text-[#7F52FF]", label: "Kotlin" },
    { icon: Icons.Python, color: "text-[#3776AB]", label: "Python" },
    { icon: Icons.HTML, color: "text-[#E34F26]", label: "HTML5" },
    { icon: Icons.CSS, color: "text-[#1572B6]", label: "CSS3" },
];

interface TechStackProps {
    onBack?: () => void;
}

export function TechStack({ onBack }: TechStackProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const velocity = useRef({ x: 0, y: 0 });

    // Auto-rotation with inertia
    useAnimationFrame((t, delta) => {
        if (isDragging) return;

        // Decay velocity
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;

        // Combined constant rotation + inertia
        setRotation(prev => ({
            x: prev.x + (delta * 0.002) + (velocity.current.x * delta * 0.0001),
            y: prev.y + (delta * 0.002) + (velocity.current.y * delta * 0.0001)
        }));
    });

    const handleDrag = (_: any, info: any) => {
        setRotation(prev => ({
            x: prev.x + info.delta.y * 0.1,
            y: prev.y + info.delta.x * 0.1
        }));
    };

    const handleDragEnd = (_: any, info: any) => {
        setIsDragging(false);
        velocity.current = { x: info.velocity.y, y: info.velocity.x };
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full h-full cursor-grab active:cursor-grabbing group touch-none"
            onClick={(e) => {
                if (onBack) {
                    e.stopPropagation();
                    onBack();
                }
            }}
            onPan={handleDrag}
            onPanStart={() => setIsDragging(true)}
            onPanEnd={handleDragEnd}
        >
            {/* Central Logo/Icon (Optional - User's logo or just empty space) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Animated Central Node */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center bg-foreground/5 backdrop-blur-sm"
                >
                    <div className="w-8 h-8 rounded-full bg-primary-500/50 blur-md" />
                </motion.div>
            </div>

            {/* Floating Icons */}
            {items.map((item, index) => {
                // Spherical distribution (Fibonacci Sphere)
                const phi = Math.acos(-1 + (2 * index) / items.length);
                const theta = Math.sqrt(items.length * Math.PI) * phi;

                const radius = 190; // Increased radius further

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
                const scale = (z2 + radius * 2) / (radius * 3); // Simple depth scaling
                const opacity = Math.max(0.1, (z2 + radius) / (radius * 2)); // Fade distant items
                const zIndex = Math.floor(z2 + radius);

                return (
                    <motion.div
                        key={index}
                        className={`absolute top-1/2 left-1/2 ${item.color} flex flex-col items-center justify-center`}
                        animate={{
                            x: x2,
                            y: y1,
                            scale: scale,
                            opacity: opacity,
                            zIndex: zIndex
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        style={{
                            translateX: "-50%",
                            translateY: "-50%"
                        }}
                    >
                        <item.icon className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl" />
                    </motion.div>
                );
            })}

            {/* Click hint */}
            {onBack && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-xs text-muted-foreground">Click to return</p>
                </div>
            )}
        </motion.div>
    );
}
