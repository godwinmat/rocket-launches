"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { useRouter } from "next/navigation";

const outcomes = ["Succeeded", "Failed"];

const formSchema = z.object({
    year: z.string(),
    missionName: z.string(),
    outcome: z.string(),
});

const SearchForm = ({ uniqueYears }) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: "",
            missionName: "",
            outcome: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    function checkOutcome(outcome) {
        if (outcome === "Failed") return false;
        if (outcome === "Succeeded") return true;
        if (outcome === "") return "";
    }

    function onSubmit(values) {
        const query = {
            mission_name: values?.missionName,
            year: values?.year,
            outcome: checkOutcome(values?.outcome),
        };

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipEmptyString: true, skipNull: true }
        );

        if (url.includes("#data-grid")) {
            router.push(url);
        } else {
            router.push(url + "#data-grid");
        }
        window.location.reload();
    }

    return (
        <div className="w-full px-4 md:px-10 lg:px-20 flex justify-center items-center">
            <div className="py-20 text-center">
                <h1 className="text-4xl py-5">Find A Specific Launch</h1>
                <p>
                    Search for specific rocket launches by mission name, year or
                    outcome
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3 mt-10"
                    >
                        <FormField
                            control={form.control}
                            name="missionName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Mission Name"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className=" focus-visible:ring-0  focus-visible:ring-transparent bg-transparent w-full flex justify-start pl-3"
                                                disabled={isLoading}
                                            >
                                                <h1
                                                    className={cn(
                                                        "font-light",
                                                        !field.value
                                                            ? "text-muted-foreground"
                                                            : "text-white"
                                                    )}
                                                >
                                                    {!field.value
                                                        ? "Year"
                                                        : field.value}
                                                </h1>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="h-[261px] w-40 overflow-y-scroll"
                                        >
                                            {uniqueYears.map((year) => (
                                                <DropdownMenuItem
                                                    key={year}
                                                    className="flex justify-between"
                                                    onClick={() => {
                                                        form.setValue(
                                                            "year",
                                                            year
                                                        );
                                                        form.clearErrors(
                                                            "year"
                                                        );
                                                    }}
                                                >
                                                    {year}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="outcome"
                            render={({ field }) => (
                                <FormItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className=" focus-visible:ring-0  focus-visible:ring-transparent bg-transparent w-full flex justify-start pl-3"
                                                disabled={isLoading}
                                            >
                                                <h1
                                                    className={cn(
                                                        "font-light",
                                                        !field.value
                                                            ? "text-muted-foreground"
                                                            : "text-white"
                                                    )}
                                                >
                                                    {!field.value
                                                        ? "Outcome"
                                                        : field.value}
                                                </h1>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {outcomes.map((outcome) => (
                                                <DropdownMenuItem
                                                    key={outcome}
                                                    className="flex justify-between"
                                                    onClick={() => {
                                                        form.setValue(
                                                            "outcome",
                                                            outcome
                                                        );
                                                        form.clearErrors(
                                                            "outcome"
                                                        );
                                                    }}
                                                >
                                                    {outcome}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SearchForm;
