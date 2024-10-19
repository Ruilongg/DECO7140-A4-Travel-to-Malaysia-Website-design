// Import the consoleMessage function from the page_load_message.js file
import { consoleMessage } from './page_load_message.js';

// Log a message in the console indicating that the index page has been loaded


// Call the consoleMessage function (imported from page_load_message.js)
// This function will log "Page has loaded successfully." to the console
consoleMessage();


//display a confirmation message when the page loads, and it does so using a modular approach


// 监听表单提交事件
document.querySelector('.contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // 防止表单默认提交行为

    // 获取表单数据
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // 构建要发送的数据
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message
    };

    try {
        // 使用 fetch 发送 POST 请求
        const response = await fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/', { // 替换为您的后端 API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // 检查响应
        if (response.ok) {
            const result = await response.json();
            alert("Message sent successfully!");
            console.log(result);
        } else {
            alert("Failed to send message.");
            console.log('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    }
});

