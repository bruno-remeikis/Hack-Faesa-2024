'use client'

import { useRouter } from "next/navigation";

export function AppTitle() {

    const router = useRouter();

    return (
        <h1 className="cursor-pointer" onClick={() => router.push('/')}>NicePrice</h1>
    )
}