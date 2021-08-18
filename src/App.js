import React, { useState } from 'react';
import { MdAddCircle, MdTapAndPlay } from 'react-icons/md';
import './App.css';
import Template from "./components/Template";
import TodoInsert from './components/TodoInsert';
import TodoList from "./components/TodoList";

let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false); // 입력 토글
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일 1",
      checked: true
    },
    {
      id: 2,
      text: "할일 2",
      checked: false
    },
    {
      id: 3,
      text: "할일 3",
      checked: true
    }
  ]);

  // 창을 닫는 것
  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null)
    }
    setInsertToggle(prev => !prev); // 이전값의 Boolean 값을 반대로
  };

  const onInsertTodo = (text) => {
    if (text === "") {
      return alert("할 일을 입력해주세요.");
    } else {
      const todo = {
        id: nextId,
        text,
        checked: false
      };
      setTodos(todos => todos.concat(todo));
      nextId++;
    }
  };

  const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (
      todo.id == id ? {...todo, checked: !todo.checked} : todo
      )
    ))
  }

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo)
  }

  const onRemove = id => {
    onInsertToggle();  // 삭제를 했으니 일단 창이 닫임
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  // {...todo, text} todo 배열을 풀어주고 text를 가져온다

  return (
    <Template todoLength={todos.length}>
      <TodoList 
      todos={todos} 
      onCheckToggle={onCheckToggle} 
      onInsertToggle={onInsertToggle}
      onChangeSelectedTodo={onChangeSelectedTodo} />
      <div className="add-todo-button" onClick={onInsertToggle}>
        <MdAddCircle />
      </div>
      {insertToggle && 
      <TodoInsert 
      selectedTodo={selectedTodo}
      onInsertToggle={onInsertToggle} 
      onInsertTodo={onInsertTodo} 
      onRemove={onRemove}
      onUpdate={onUpdate}
      />}
    </Template>
  );
};

export default App;