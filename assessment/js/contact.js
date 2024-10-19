import { submitContactForm } from './components.js';

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        first_name: document.getElementById('first-name').value,
        last_name: document.getElementById('last-name').value,
        Email: document.getElementById('email').value,
        Phone: document.getElementById('phone').value,
        Message: document.getElementById('message').value
    };

    const headers = {
        "Content-Type": "application/json",
        "student_number": "s4600312",
        "uqcloud_zone_id": "4998645e"
    };

    function handleSuccess(result) {
        alert("Message sent successfully!");
        console.log("Server response:", result);
        document.getElementById('contactForm').reset();
    }

    function handleError(error) {
        alert("Failed to send message, please try again!");
        console.error("An error occurred:", error);
    }

    submitContactForm(formData, headers, handleSuccess, handleError);
});



