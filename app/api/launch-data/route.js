import { NextResponse } from "next/server";

const axios = require("axios");

const url = "https://api.spacexdata.com/v3/launches";

export async function GET() {
    try {
        const response = await axios.get(url);
        const data = response.data?.map((datum) => {
            const newObject = {
                name: datum.mission_name,
                flight_number: datum.flight_number,
                upcoming: datum.upcoming,
                year: datum.launch_year,
                launch_site: datum.launch_site.site_name_long,
                launch_success: datum.launch_success,
                details: datum.details,
                video_link: datum.links.video_link,
                image: datum.links.flickr_images[0],
            };

            return newObject;
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log(error.message);
        return new NextResponse.json({ error: error.message });
    }
}
