import { number } from "prop-types"
import { bool } from "prop-types"
import { string } from "prop-types"
import { shape } from "prop-types"
import { types, useTodos } from "../store/todos"
import { useRef, useState } from "react"
export const Item = ({ data, index }) => {
    const { dispatch } = useTodos(state => state);
    const [ onEdit, setOnEdit ] = useState(false);
    const inputRef = useRef();
    const onClick = e => {
        if(e.detail === 2) {
            setOnEdit(true);
            setTimeout(() => {
                inputRef.current.focus();
            })
        }
    }
    const onChange = e => {
        const value = e.target.value;
        if(
            value.length > 1 &&
            e.key == 'Enter'
        ) {
            if(value !== data.content) { 
                dispatch({type: types.update, index, payload: {...data, content: value}});
            }
            setOnEdit(false);
        }
    };
    return <li key={data.id}>
        <div className="view">
            <div className={'input-container ' + (onEdit ? '' : 'hidden')}>
                <input
                    className="new-todo"
                    id="todo-input"
                    type="text"
                    defaultValue={data.content}
                    onBlur={() => setOnEdit(false)}
                    onKeyDown={onChange}
                    autoFocus
                    ref={inputRef}
                />
                <label className="visually-hidden" htmlFor="todo-input">Edit Todo Input</label>
            </div>
            {
                onEdit ? <>
                    
                </> : <>
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={data.completed}
                        onChange={() => dispatch({ type: types.update, index, payload: { ...data, completed: !data.completed } })}
                    />
                    <label onClick={onClick}>{data.content}</label>
                    <button
                        className="destroy"
                        onClick={() => dispatch({type: types.remove, index})}
                    />
                </>
            }
            
        </div>
  </li>
}
Item.propTypes = {
    data: shape({
        content: string,
        id: number,
        completed: bool
    }).isRequired,
    index: number.isRequired
}