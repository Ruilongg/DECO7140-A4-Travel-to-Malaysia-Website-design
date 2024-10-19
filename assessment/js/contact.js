// 正确导入 headers
import { headers } from './components.js'; // 从 components.js 导入 headers

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
                const response = await fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/', {
                    method: 'POST',
                    headers: headers,
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to create event');
                }

                const data = await response.json();
                handleSuccess(data);
            } catch (error) {
                handleError(error);
            }
        });
    }

    function handleSuccess(data) {
        const responseElement = document.getElementById('submitResponse');
        responseElement.textContent = 'Event created successfully!';
        console.log('Event created successfully:', data);
        document.getElementById('create-event-form').reset();
    }

    function handleError(error) {
        const responseElement = document.getElementById('submitResponse');
        responseElement.textContent = 'Failed to create event. Please try again.';
        console.error('Error:', error);
    }
});
