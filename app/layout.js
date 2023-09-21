import "./globals.css";
import { Montserrat_Alternates } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

const montserratAlternates = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export const metadata = {
    title: "Rocket Launches🚀",
    description: "Explore Rocket's Launch Data",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={cn(montserratAlternates.className, "relative")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
