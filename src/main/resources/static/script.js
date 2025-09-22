const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

async function fetchTasks() {
    try {
        const res = await fetch('/tasks');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        taskList.innerHTML = '';
        data.forEach(t => {
            const li = document.createElement('li');
            li.textContent = t.title;
            taskList.appendChild(li);
        });
    } catch (err) {
        console.error('Failed to load tasks', err);
        taskList.innerHTML = '<li style="color:tomato">Failed to load tasks</li>';
    }
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;
    try {
        const res = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        if (!res.ok) throw new Error('Failed to add task');
        taskInput.value = '';
        fetchTasks();
    } catch (err) {
        console.error('Failed to add task', err);
    }
});

fetchTasks();