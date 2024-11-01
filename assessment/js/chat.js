// chat.js
//这段代码的核心是通过 fetchPost 和 fetchGet 来与服务器进行通信，
//实现聊天消息的获取和发送功能。通过使用 handleGetSuccess 和 handlePostSuccess 等回调函数，确保请求成功时可以正确处理响应数据
// Import the reusable fetchPost and fetchGet functions
import { fetchPost, fetchGet } from './components.js';

const MAX_CHAT_POSTS = 1;

// Define fetchChatMessages directly in chat.js
// 用于从服务器获取聊天消息数据
function fetchChatMessages() {
    fetchGet("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericchat/", handleGetSuccess, handleGetError);
}

// Success and error handlers for POST
// 处理 POST 请求成功的回调函数 Callback function to handle successful POST requests
function handlePostSuccess(result) {
    console.log("Message posted:", result);
    fetchChatMessages(); // Refresh chat after successful post
}

// 处理 POST 请求失败的回调函数 Callback function to handle failed POST requests
function handlePostError(error) {
    console.error("Failed to post message:", error);
}

// 处理 GET 请求成功的回调函数
// Success and error handlers for GET
function handleGetSuccess(data) {
     console.log("Chat data:", data);
 
     // 按时间降序排列数据，最新的消息在最前面
     // Sort the data in descending order by time, so the latest message is at the top
     data.sort((a, b) => new Date(b.chat_date_time) - new Date(a.chat_date_time));
 
     let output = "";
 
     // 只取最新的一条消息 Take only the latest message
     const latestMessage = data.slice(0, 1);
     
     // 将生成的 HTML 插入到 chat-list 元素中，更新页面显示
     // Iterate through the latest messages and generate HTML content
     latestMessage.forEach(chatPost => {
         output += `
             <div>
                 <p><strong>Person_name:</strong> ${chatPost.person_name}</p>
                 <p><strong>Title:</strong> ${chatPost.chat_post_title}</p>
                 <p><strong>Message:</strong> ${chatPost.chat_post_content}</p>
                 <p><strong>Time:</strong> ${chatPost.chat_date_time}</p>
                 <p><strong>Website Code:</strong> ${chatPost.website_code}</p> 
             </div>
             <hr>
         `;
     });
     // 将生成的 HTML 插入到 chat-list 元素中，更新页面显示
     // Insert the generated HTML into the chat-list element, updating the display
     document.getElementById('chat-list').innerHTML = output;
 }
 
// 处理 GET 请求失败的回调函数
// Callback function to handle failed GET requests
function handleGetError(error) {
    console.error("Failed to load chat messages:", error);
}

//为聊天表单添加提交事件监听器
// Event listener for submitting chat message
document.getElementById('chatPostForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = document.getElementById('chatPostForm');
    const formData = new FormData(form);
    // Use fetchPost to send a POST request, submitting the form data to the server
    fetchPost("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericchat/", formData, handlePostSuccess, handlePostError);
});

//在页面加载时自动调用 fetchChatMessages，获取并显示最新的聊天消息
// Load chat messages on page load
window.onload = fetchChatMessages;




