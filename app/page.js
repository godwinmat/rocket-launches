import Banner from "@/components/banner";
import DataGrid from "@/components/data-grid";
import Form from "@/components/form";
import { axiosInstance } from "@/lib/axios";
import { getUniqueYears } from "@/lib/get-unique-years";

export default async function Home() {
    const response = await axiosInstance.get("/api/launch-data");
    const uniqueYears = getUniqueYears(response.data);

    return (
        <main>
            <Banner />
            <Form uniqueYears={uniqueYears} />
            <DataGrid />
        </main>
    );
}
