// 从 components.js 导入 headers 和 fetchEventsFromAPI
import { headers, fetchEventsFromAPI, submitContactForm } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
    // 表单提交处理
    const createEventForm = document.getElementById('create-event-form');
    if (createEventForm) {
        createEventForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // 阻止表单的默认提交行为

            // 准备表单数据
            const formData = new FormData();
            formData.append('event_name', document.getElementById('event-name').value);
            formData.append('location', document.getElementById('location').value);
            formData.append('organiser', document.getElementById('organiser').value);
            formData.append('event_type', document.getElementById('event-type').value);
            formData.append('description', document.getElementById('description').value);

            const dateTime = new Date(document.getElementById('date-time').value);
            formData.append('date_time', dateTime.toISOString());

            const fileInput = document.getElementById('event-photo');
            if (fileInput.files.length > 0) {
                formData.append('genericevent_photo', fileInput.files[0]);
            }

            try {
                submitContactForm(formData, headers, handleSuccess, handleError);
            } catch (error) {
                handleError(error);
            }
        });
    }

    // 页面加载时获取事件数据
    loadEvents();

    // 使用 fetchEventsFromAPI 函数加载事件
    async function loadEvents() {
        try {
            const events = await fetchEventsFromAPI(); // 使用从 components.js 导入的 GET 功能
            displayEvents(events); // 显示获取到的事件
        } catch (error) {
            displayError(); // 显示错误信息
        }
    }

    function handleSuccess(data) {
        const responseElement = document.getElementById('submitResponse');
        responseElement.textContent = 'Event created successfully!';
        console.log('Event created successfully:', data);
        document.getElementById('create-event-form').reset();
        loadEvents(); // 成功创建新事件后，重新加载事件列表
    }

    function handleError(error) {
        const responseElement = document.getElementById('submitResponse');
        responseElement.textContent = 'Failed to create event. Please try again.';
        console.error('Error:', error);
    }

    // 显示获取到的事件
    function displayEvents(events) {
        const eventList = document.getElementById('event-list');
        eventList.innerHTML = ''; // 清空已有内容

        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${event.event_name}</h3>
                <p>Location: ${event.location}</p>
                <p>Organiser: ${event.organiser}</p>
                <p>Type: ${event.event_type}</p>
                <p>Description: ${event.description}</p>
                <p>Date & Time: ${new Date(event.date_time).toLocaleString()}</p>
                <img src="${event.genericevent_photo}" alt="Event Photo" style="width: 100px; height: auto;">
            `;
            eventList.appendChild(listItem);
        });
    }

    function displayError() {
        const eventList = document.getElementById('event-list');
        if (eventList) {
            eventList.innerHTML = '<li>Failed to load events. Please try again later.</li>';
        } else {
            console.error('Event list element not found');
        }
    }
});
