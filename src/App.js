import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Todo({ todo, index, completedItem, removeItem }) {
    return (
        <div className="todo">
            <span>{todo.text}</span>
            <div>
                <Button variant="outline-success" onClick={() => completedItem(index)}>✓</Button>{' '}
                <Button variant="outline-danger" onClick={() => removeItem(index)}>✕</Button>
            </div>
        </div>
    );
    }

function FormTodo({ addTodo }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}> 
        <Form.Group>
            <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new item" />
            <Button variant="primary" type="submit">Add item</Button>
        </Form.Group>
    </Form>
    );
}

function App() {
    const defaultTodos = () => {
        const arrayStorage = localStorage.getItem('todoList');
        let items;
        if (arrayStorage && arrayStorage.length) {
            items = JSON.parse(arrayStorage);
        }
        return items;
    };

    const [todos, setTodos] = React.useState(defaultTodos());

    const updateStorage = items => {
        localStorage.setItem('todoList', JSON.stringify(items));
    };

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
        updateStorage(newTodos);
    };

    const completedItem = index => {
        const newTodos = [...todos];
        newTodos[index].isDone = true;
        setTodos(newTodos);
    };

    const removeItem = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        updateStorage(newTodos);
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4">Peex</h1>
                <FormTodo addTodo={addTodo} />
                <div>
                {todos.map((todo, index) => (
                    <Card>
                        <Card.Body>
                            <Todo
                                key={index}
                                index={index}
                                todo={todo}
                                completedItem={completedItem}
                                removeItem={removeItem}
                            />
                        </Card.Body>
                    </Card>
                ))}
                </div>
            </div>
        </div>
    );
}

export default App;