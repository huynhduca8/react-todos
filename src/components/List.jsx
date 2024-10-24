import { useShallow } from "zustand/shallow";
import { types, useTodos } from "../store/todos";
import { Item } from "./Item";

export const List = () => {
    const todos = useTodos(useShallow(state => state.computed.todosFilterd));
    const todoActives = useTodos(useShallow(state => state.computed.todosActive));
    const { todos: allTodos, dispatch } = useTodos(state => state);
    console.log('rerender List');
    if(!allTodos.length || !todos.length) return;
    return <main className="main">
      <div className="toggle-all-container">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={todos.length && !todoActives.length}
          onChange={() => dispatch({type: types.changeAll})}
        />
        <label className="toggle-all-label" htmlFor="toggle-all">
          Toggle All Input
        </label>
      </div>
      <ul className="todo-list">
        {
          todos.map((todo, index) => <Item key={todo.id} data={todo} index={index} />)
        }
      </ul>
    </main>;
}