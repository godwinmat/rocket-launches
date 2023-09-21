"use client";

import Banner from "@/components/banner";
import DataGrid from "@/components/data-grid";
import Form from "@/components/form";
import { getUniqueYears } from "@/lib/get-unique-years";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState(null);
    const [uniqueYears, setUniqueYears] = useState([]);

    async function getData() {
        try {
            const { data } = await axios.get("/api/launch-data");
            setUniqueYears(getUniqueYears(data));
            setData(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <main>
            <Banner />
            <Form uniqueYears={uniqueYears} />
            <DataGrid />
        </main>
    );
}
