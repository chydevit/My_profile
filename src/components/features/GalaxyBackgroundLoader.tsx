"use client";

import dynamic from "next/dynamic";

const GalaxyBackground = dynamic(
    () => import("./GalaxyBackground").then(m => m.GalaxyBackground),
    { ssr: false }
);

export function GalaxyBackgroundLoader() {
    return <GalaxyBackground />;
}
