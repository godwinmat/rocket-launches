"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import DataTable from "./data-table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { axiosInstance } from "@/lib/axios";

const columns = [
    {
        accessorKey: "name",
        header: () => <div className="text-center">Name</div>,
    },
    {
        accessorKey: "year",
        header: () => <div className="text-center">Year</div>,
    },
    {
        accessorKey: "details",
        header: () => <div className="text-center">Details</div>,
        cell: ({ row }) => {
            const details = row?.getValue("details");
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <h1>
                                {details?.slice(0, 50)}
                                {details?.length > 50 ? "..." : ""}
                            </h1>
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                            <p>{details}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        accessorKey: "flight_number",
        header: () => <div className="text-center">Flight Number</div>,
    },
    {
        accessorKey: "launch_success",
        header: () => <div className="text-center">Launch Success</div>,
        cell: ({ row }) => {
            const launchSuccess = row?.getValue("launch_success");
            return <h1>{launchSuccess ? "True" : "False"}</h1>;
        },
    },
    {
        accessorKey: "launch_site",
        header: () => <div className="text-center">Launch Site</div>,
        cell: ({ row }) => {
            const launchSite = row?.getValue("launch_site");
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <h1>
                                {launchSite?.slice(0, 30)}
                                {launchSite?.length > 30 ? "..." : ""}
                            </h1>
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                            <p>{launchSite}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        accessorKey: "upcoming",
        header: () => <div className="text-center">Upcoming</div>,
        cell: ({ row }) => {
            const upcoming = row?.getValue("upcoming");
            return <h1>{upcoming ? "True" : "False"}</h1>;
        },
    },
    {
        accessorKey: "video_link",
        header: () => <div className="text-center">Video Link</div>,
        cell: ({ row }) => {
            const link = row?.getValue("video_link");

            if (link) {
                return (
                    <Link
                        href={link}
                        target="_blank"
                        className="underline hover:text-blue-700"
                    >
                        Watch Video
                    </Link>
                );
            }

            return <div>No Video</div>;
        },
    },
    {
        accessorKey: "image",
        header: () => <div className="text-center">Image</div>,
        cell: ({ row }) => {
            const image = row?.getValue("image");

            if (image) {
                return (
                    <Link
                        href={image}
                        target="_blank"
                        className="underline hover:text-blue-700"
                    >
                        View Image
                    </Link>
                );
            }

            return <div>No Image</div>;
        },
    },
];

const DataGrid = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const missionName = searchParams.get("mission_name");
    const year = searchParams.get("year");
    const outcome = searchParams.get("outcome");

    useEffect(() => {
        async function getData() {
            const response = await axiosInstance.get("/api/launch-data");
            let data = [];

            if (response.data.error) {
                setError(response.data.error);
                return;
            }

            if (outcome !== null && missionName === null && year === null) {
                data = response.data?.filter(
                    (resp) =>
                        JSON.parse(resp.launch_success) === JSON.parse(outcome)
                );
            } else if (
                missionName !== null &&
                year === null &&
                outcome === null
            ) {
                data = response.data?.filter(
                    (resp) => missionName === resp.name
                );
            } else if (
                year !== null &&
                missionName === null &&
                outcome === null
            ) {
                data = response.data?.filter(
                    (resp) => Number(year) === Number(resp.year)
                );
            } else if (
                missionName !== null &&
                outcome !== null &&
                year === null
            ) {
                data = response.data?.filter(
                    (resp) =>
                        missionName === resp.name &&
                        JSON.parse(resp.launch_success) === JSON.parse(outcome)
                );
            } else if (
                missionName !== null &&
                outcome === null &&
                year !== null
            ) {
                data = response.data?.filter(
                    (resp) =>
                        Number(year) === Number(resp.year) &&
                        missionName === resp.name
                );
            } else if (
                missionName === null &&
                outcome !== null &&
                year !== null
            ) {
                data = response.data?.filter(
                    (resp) =>
                        Number(year) === Number(resp.year) &&
                        JSON.parse(resp.launch_success) === JSON.parse(outcome)
                );
            }
            setData(data);
        }

        getData();
    }, []);

    return (
        <div
            id="data-grid"
            className="bg-[#0F151E] w-full px-4 md:px-10 lg:px-20 flex justify-center items-center"
        >
            <div className="py-20 text-center min-w-full">
                <h1 className="text-4xl py-5">Launch Details</h1>
                <p>Mission Name: {missionName}</p>
                <p>Year: {year}</p>
                <p>Outcome: {outcome}</p>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default DataGrid;
