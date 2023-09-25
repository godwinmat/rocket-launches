"use client";

import React from "react";
// import { ModeToggle } from "./theme-toggle";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { scrollIntoTheView } from "@/lib/scrollIntoView";

const Navbar = () => {
    const router = useRouter();
    return (
        <div className="text-white h-16 absolute top-0 left-0 right-0 z-10 w-full flex justify-between items-center py-4 px-4 md:px-10 lg:px-20">
            <Logo />
            <div className="flex items-center gap-5">
                <Button
                    variant="outline"
                    className="border border-white bg-transparent hidden md:flex"
                    // onClick={() => router.push("#data-grid")}
                    onClick={() => scrollIntoTheView("data-grid")}
                >
                    <span className="text-base">Explore Launches</span>{" "}
                    <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
                {/* <ModeToggle /> */}
            </div>
        </div>
    );
};

export default Navbar;
