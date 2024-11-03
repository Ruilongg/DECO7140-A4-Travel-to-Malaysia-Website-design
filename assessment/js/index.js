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


// index.js
document.addEventListener('DOMContentLoaded', () => {
    // 语言选择器功能
    const languageBtn = document.querySelector('.language-btn');
    const languageOptions = document.querySelector('.language-options');
    
    if (languageBtn && languageOptions) {
        languageBtn.addEventListener('click', () => {
            const expanded = languageBtn.getAttribute('aria-expanded') === 'true';
            languageBtn.setAttribute('aria-expanded', !expanded);
            languageOptions.classList.toggle('show');
        });

        // 点击外部关闭语言选择器
        document.addEventListener('click', (e) => {
            if (!languageBtn.contains(e.target)) {
                languageBtn.setAttribute('aria-expanded', 'false');
                languageOptions.classList.remove('show');
            }
        });

        // 键盘导航
        languageOptions.addEventListener('keydown', (e) => {
            const options = languageOptions.querySelectorAll('[role="menuitem"]');
            const currentIndex = Array.from(options).indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < options.length - 1) {
                        options[currentIndex + 1].focus();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        options[currentIndex - 1].focus();
                    }
                    break;
                case 'Escape':
                    languageBtn.setAttribute('aria-expanded', 'false');
                    languageOptions.classList.remove('show');
                    languageBtn.focus();
                    break;
            }
        });
    }

    // 搜索标签切换功能
    const searchTabs = document.querySelectorAll('.search-tab');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除其他标签的活动状态
            searchTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // 设置当前标签为活动状态
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            // 通知屏幕阅读器
            announceTabChange(tab.textContent);
        });
    });

    // 搜索表单验证
    const searchForm = document.querySelector('.search-container');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            validateForm();
        });
    }
});

// 辅助函数
function announceTabChange(tabName) {
    // 创建一个aria-live区域来通知屏幕阅读器
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `Switched to ${tabName} search`;
    document.body.appendChild(announcement);
    
    // 清理通知元素
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

function validateForm() {
    const destination = document.getElementById('destination');
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');
    const guests = document.getElementById('guests');
    
    let isValid = true;
    const errors = [];

    // 简单验证示例
    if (!destination.value.trim()) {
        errors.push('Please enter a destination');
        isValid = false;
    }

    if (!checkIn.value) {
        errors.push('Please select a check-in date');
        isValid = false;
    }

    if (!checkOut.value) {
        errors.push('Please select a check-out date');
        isValid = false;
    }

    if (!guests.value.trim()) {
        errors.push('Please enter number of guests');
        isValid = false;
    }

    if (!isValid) {
        // 创建错误提示
        const errorContainer = document.createElement('div');
        errorContainer.setAttribute('role', 'alert');
        errorContainer.classList.add('error-message');
        errorContainer.innerHTML = errors.join('<br>');
        
        // 添加到表单
        const existingError = searchForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        searchForm.appendChild(errorContainer);
    } else {
        // 表单验证通过，可以提交
        console.log('Form submitted successfully');
    }
}