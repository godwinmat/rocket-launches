export function getUniqueYears(arrayOfObjects) {
    // Create a Set to store unique years
    const uniqueYears = new Set();

    // Iterate through the array of objects
    for (const obj of arrayOfObjects) {
        // Check if the object has a 'year' key
        if (obj.hasOwnProperty("year")) {
            // Add the 'year' value to the Set
            uniqueYears.add(obj.year);
        }
    }

    // Convert the Set back to an array if needed
    const uniqueYearsArray = [...uniqueYears];

    return uniqueYearsArray;
}
