'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false,
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const errorEl = document.querySelector('#error')
    const text = e.target.elements.text.value.trim()
    console.log(text.length)
    if (text.length > 0) {
        const todoExists = todos.findIndex((todo) => todo.text === text)
        if (todoExists > -1) {
            errorEl.innerHTML = ''
            const todoExistsError = document.createElement('p');
            todoExistsError.textContent = 'todo already exists note'
            errorEl.appendChild(todoExistsError)
        } else {
            errorEl.innerHTML = ''
            todos.push({
                id: uuidv4(),
                text,
                completed: false
            })
            saveTodos(todos)
            renderTodos(todos, filters)
            e.target.elements.text.value = ''
        }

    } else {
        errorEl.innerHTML = '';
        const emptyError = document.createElement('p');
        emptyError.textContent = 'Please Enter valid note'
        errorEl.appendChild(emptyError)
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})