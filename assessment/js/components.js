// 常量，用于身份认证 Constants for authentication
const studentNumber = "s4600312"; 
const uqcloudZoneId = "724d9014"; 

// 正确设置 Headers Headers（请求头/响应头）是在 HTTP 请求和响应中传递的附加信息。
//它们帮助客户端和服务器在进行通信时传递元数据，比如认证信息、内容类型、缓存控制等
// 这将确保每个请求都携带所需的身份认证信息
//ensure that each request carries the required authentication information

// 通用身份认证的请求头
// Common headers for authentication
const myHeaders = new Headers();
myHeaders.append("student_number", studentNumber); 
myHeaders.append("uqcloud_zone_id", uqcloudZoneId); 

// 通用的 FETCH POST 组件 Generic FETCH POST component
// 这个函数用于向指定的 URL 发送 POST 请求 used to send POST requests to a specified URL
export function fetchPost(url, formData, handleSuccess, handleError) {
    // 设置 POST 请求的选项
    const requestOptions = {
        method: "POST", // HTTP 方法
        headers: myHeaders, // 包含身份认证的请求头 Include the headers with authentication details
        body: formData, // 发送的请求主体数据（表单数据） Form data to send in the body of the request
        redirect: "follow" // 如何处理重定向 How redirects should be handled
    };

    // Send the POST request using fetch
    fetch(url, requestOptions)
        .then(response => response.json()) // 将响应解析为 JSON 格式
        .then(result => handleSuccess(result)) // 如果请求成功，调用成功处理函数 Call the success handler if the request was successful
        .catch(error => handleError(error)); // 如果请求失败，调用错误处理函数 Call the error handler if the request failed
}

// 通用的 FETCH GET 组件 Generic FETCH GET component
// 这个函数用于向指定的 URL 发送 GET 请求
export function fetchGet(url, handleSuccess, handleError) {
    // 设置 GET 请求的选项
    const requestOptions = {
        method: "GET", // HTTP 方法 用来指示客户端（比如浏览器）与服务器之间如何进行通信
        headers: myHeaders, // 包含身份认证的请求头
        redirect: "follow" // 如何处理重定向
    };

    // 使用 fetch 发送 GET 请求
    fetch(url, requestOptions)
        .then(response => response.json()) // 将响应解析为 JSON 格式 Parse the response as JSON
        .then(data => handleSuccess(data)) // 如果请求成功，调用成功处理函数 Call the success handler if the request was successful
        .catch(error => handleError(error)); // 如果请求失败，调用错误处理函数 Call the error handler if the request failed
}

