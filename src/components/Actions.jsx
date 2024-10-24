import { useShallow } from "zustand/shallow";
import { filterType, useTodos } from "../store/todos";

export const Actions = () => {
    const { todos, setFilter, filter, clearCompleted } = useTodos(state => state);
    const todosActive = useTodos(useShallow(state => state.computed.todosActive));
    console.log('rerender Actions');
    if(!todos.length) return null;
    return <footer className="footer">
        <span className="todo-count">{todosActive.length} item{todosActive.length == 1 ? '' : 's'} left!</span>
        <ul className="filters">
            {
                Object.keys(filterType).map(key => (
                    <li key={key}>
                        <a
                            className={filter === filterType[key] ? 'selected' : undefined}
                            href={'#' + (key === 'all' ? '' : key)}
                            onClick={() => setFilter(filterType[key])}
                        >
                            {filterType[key]}
                        </a>
                    </li>
                ))
            }
        </ul>
        <button
            className="clear-completed"
            disabled={todos.length === todosActive.length}
            onClick={() => clearCompleted()}
        >
            Clear completed
        </button>
    </footer>;
}