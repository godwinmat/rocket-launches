const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;
const url = "https://api.spacexdata.com/v3/launches";

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a simple route
app.get("/api/launchdata", async (req, res) => {
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
        res.json(data);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
