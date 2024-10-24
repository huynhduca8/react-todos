import { Actions } from './components/Actions';
import { List } from './components/List';
import { types, useTodos } from './store/todos';

let num = 1;
function App() {
  const { dispatch } = useTodos((state) => state);
  console.log('rerender App', num++);
  const onAdd = e => {
    if(e.key !== 'Enter') return;
    const value = e.target.value;
    if(value.length >= 2) {
      e.target.value = '';
      dispatch({
        type: types.add, 
        payload: {
          id: new Date().getTime(),
          content: value,
          completed: false
        }
      });
    }
  };
  return (
    <div className='todoapp'>
      <div className='header'>
        <h1>todos</h1>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          onKeyDown={onAdd}
        />
      </div>
      <List />
      <Actions />
    </div>
  )
}

export default App
