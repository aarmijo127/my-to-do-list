document.getElementById('add_button').addEventListener('click', addItem);

window.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task_list');

    savedTasks.forEach(task => {
        const newRow = document.createElement('tr');

        const taskCell = document.createElement('td');
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        taskCell.appendChild(textSpan);

        const removeCell = document.createElement('td');
        const removeItem = document.createElement('button');
        removeItem.textContent = 'Delete';
        removeItem.classList.add('remove_button');
        removeItem.addEventListener('click', () => {
            taskList.removeChild(newRow);
            saveTasks();
        });
        removeCell.appendChild(removeItem);

        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkboxCell.appendChild(checkbox);

        const listLabel = document.createElement('label');
        listLabel.setAttribute('for', checkbox.id);

        checkbox.addEventListener('click', () => {
            textSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            saveTasks();
        });

        // Strike-through if saved as done
        if (task.done) {
            textSpan.style.textDecoration = 'line-through';
        }

        newRow.appendChild(checkboxCell);
        newRow.appendChild(taskCell);
        newRow.appendChild(removeCell);
        taskList.appendChild(newRow);
    });
});

function addItem() {
    const inputText = document.getElementById('input_text');
    const newItem = inputText.value.trim();

    if (newItem === '') {
        alert('Please enter text.');
        return;
    }

    const taskList = document.getElementById('task_list');
    const newRow = document.createElement('tr');

    const taskCell = document.createElement('td');
    const textSpan = document.createElement('span');
    textSpan.textContent = newItem;
    taskCell.appendChild(textSpan);

    const removeCell = document.createElement('td');
    const removeItem = document.createElement('button');
    removeItem.textContent = 'Delete';
    removeItem.classList.add('remove_button');

    removeItem.addEventListener('click', () => {
        taskList.removeChild(newRow);
        saveTasks();
    });
    removeCell.appendChild(removeItem);

    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'task' + Date.now();
    checkboxCell.appendChild(checkbox);

    const listLabel = document.createElement('label');
    listLabel.setAttribute('for', checkbox.id);

    checkbox.addEventListener('click', () => {
        textSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        saveTasks();
    })

    newRow.appendChild(checkboxCell);
    newRow.appendChild(taskCell);
    newRow.appendChild(removeCell);
    taskList.appendChild(newRow);

    saveTasks();

    inputText.value = '';
    inputText.focus();
}  

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task_list tr').forEach(tr => {
        const td = tr.querySelector('td');
        if (!td) return;
        const text = tr.children[1].querySelector('span').textContent;
        const done = tr.children[0].querySelector('input[type=checkbox]').checked;
        tasks.push({ text, done });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
