//Constants
const studentNumber = "s4600312"
const uqcloudZoneId = "724d9014"

// 正确导出 headers
export const headers = new Headers();
headers.append("student_number", "s1234567");
headers.append("uqcloud_zone_id", "e11123c8");

// Function to submit form data
function submitContactForm(formData, headers, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/', {
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

export { submitContactForm };
