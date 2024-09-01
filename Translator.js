// Function to check authorization and perform translation
async function translateText(text, sourceLang, targetLang) {
    const orgID = "Chen-5147-GSGJMA";  //Organisation ID
    const apiURL = "https://api.chenosis.io/botlhale/translate/getTranslation";  // Placeholder API URL
    const authKey= "vdLxwBqidgFixbBnYEVUUZczBCARJnOc" // Authorization Key

    // Set up request options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authKey}` // Authorization header with OrgID
        },
        body: JSON.stringify({
            Text: text,
            LanguageCode: sourceLang,
            TargetCode: targetLang,
            OrgID: orgID
        })
    };

    try {
        // Send the request to the API
        const response = await fetch(apiURL, options);

        // Check if authorization was successful
        if (response.status === 401) {
            throw new Error("Unauthorized: Invalid OrgID");
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Return the translated text
        return data.TranslatedText;  // Adjust based on API's response structure
    } catch (error) {
        console.error("Translation failed:", error.message);
        return null;
    }
}

// Example usage of the function
translateText("Hello", "en-ZA", "zu-ZA")
    .then(translatedText => {
        if (translatedText) {
            console.log("Translated Text:", translatedText);
        }
    });
