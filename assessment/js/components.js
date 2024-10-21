// Constants
const studentNumber = "s4600312";
const uqcloudZoneId = "724d9014";

// 正确导出 headers
export const headers = new Headers();
headers.append("s4600312", studentNumber); // 使用常量值
headers.append("724d9014", uqcloudZoneId);

// Function to submit form data (POST)
function submitContactForm(formData, headers, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Something went wrong');
            });
        }
    })
    .then(result => {
        handleSuccess(result);
    })
    .catch(error => {
        console.error("Server response: ", error);
        handleError(error);
    });
}

// Function to fetch events from the API (GET)
export async function fetchEventsFromAPI() {
    try {
        const response = await fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/", {
            method: "GET",
            headers: headers,
            redirect: "follow"
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error so it can be handled elsewhere
    }
}

export { submitContactForm };
