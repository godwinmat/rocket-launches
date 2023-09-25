import { Rocket } from "lucide-react";
import React from "react";

const Logo = () => {
    return (
        <div className="flex text-sm md:text-lg">
            Rocket Launches
            <Rocket className="w-5 h-5 md:w-6 md:h-6" />
        </div>
    );
};

export default Logo;
