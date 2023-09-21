"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Banner = () => {
    const [imageCount, setImageCount] = useState(1);
    const router = useRouter();

    function forward() {
        setImageCount((prevValue) => (prevValue === 5 ? 1 : prevValue + 1));
    }

    function backward() {
        setImageCount((prevValue) => (prevValue === 1 ? 5 : prevValue - 1));
    }

    return (
        <div
            className={`relative w-full h-screen flex flex-col justify-center px-4 md:px-10 lg:px-20`}
        >
            <Image
                src={`/rocket${imageCount}.jpg`}
                fill
                className="object-center"
            />
            <div className="absolute bg-black/50 w-full h-full top-0 left-0 right-0" />
            <div className="text-white z-10 w-fit pl-10">
                <h1 className="text-7xl py-5">Galactic Explorations</h1>
                <p className="text-base">
                    Exploring the Cosmos, One Launch at a Time
                </p>
                <Button
                    variant="outline"
                    className="my-4 bg-transparent border border-white"
                    onClick={() => router.push("#data-grid")}
                >
                    Explore Launches <Rocket />{" "}
                </Button>
                <div className="flex w-fit gap-10 mt-5">
                    <Button
                        variant="outline"
                        className="bg-transparent border border-white"
                        onClick={backward}
                    >
                        <ChevronLeft size={30} className="cursor-pointer" />
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-transparent border border-white"
                        onClick={forward}
                    >
                        <ChevronRight size={30} className="cursor-pointer" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
