import { create } from "zustand";

export const types = {
    update: 'UPDATE',
    changeAll: 'CHANGE_ALL',
    add: 'ADD',
    remove: 'REMOVE',
    renew: 'RENEW'
};
export const filterType = {
    all: 'All',
    active: 'Active',
    completed: 'Completed'
}
const filter = ({ todos, filter }) => {
    switch(filter) {
        case filterType.all:
            return todos;
        case filterType.active:
            return todos.filter(todo => !todo.completed)
        case filterType.completed:
            return todos.filter(todo => todo.completed)
    }
};
const reducer = (state, { type, index, payload }) => {
    const todosCloned = [...state.todos];
    switch (type) {
        case types.add:
            return {
                ...state,
                todos: [...state.todos, payload]
            }
        case types.remove:
            todosCloned.splice(index, 1);
            return {
                ...state,
                todos: todosCloned
            }
        case types.update:
            todosCloned[index] = payload;
            return {
                ...state,
                todos: todosCloned
            };
        case types.renew:
            return {
                ...state,
                todos: payload
            }
        case types.changeAll: {
            const atLeastOneActive = state.todos.some(todos => !todos.completed);
            return {
                ...state,
                todos: state.todos.map(todo => ({...todo, completed: atLeastOneActive ? true : false}))
            }
        }
    }
  }

const getDefaultFilter = () => {
    let { hash } = new URL(location.href);
    hash = hash.slice(1);
    switch (hash) {
        case filterType.active.toLowerCase():
            return filterType.active;
        case filterType.completed.toLowerCase():
            return filterType.completed;
        default:
            return filterType.all;
    }
}
const key = 'todos';
export const useTodos = create((set, get) => ({
    todos: JSON.parse(localStorage.getItem(key) || '[]'),
    computed: {
        get todosFilterd() {
            return filter(get());
        },
        get todosActive() {
            return filter({ todos: get().todos, filter: filterType.active})
        }
    },
    filter: getDefaultFilter(),
    dispatch: (args) => set((state) => reducer(state, args)),
    setFilter: payload => set(state => ({...state, filter: payload})),
    clearCompleted: () => set(state => ({...state, todos: state.todos.filter(todo => !todo.completed)}))
}));
useTodos.subscribe(state => {
    localStorage.setItem(key, JSON.stringify(state.todos));
});