// Define the API endpoint and your API key
const apiUrl = 'https://api.chenosis.io/botlhale/translate/getTranslation';
const apiKey = 'vdLxwBqidgFixbBnYEVUUZczBCARJnOc';

// Function to make the API request
async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: {
                'Authorization': `Bearer ${apiKey}`, // Authorization header with the API key
                'Content-Type': 'application/json'    // Specify the content type if needed
            }
        });

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json(); // Parse the JSON data from the response
            console.log('Data:', data);
        } else {
            console.error('Authorization failed or request error:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data
fetchData();



