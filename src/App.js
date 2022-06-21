import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);
  const updateTaskData = (updatedTask) => {
    console.log('updateTaskData');
    const tasks = taskData.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      } else return task;
    });
    setTaskData(tasks);
  };
  const deleteTask = (id) => {
    console.log('deleteTask');
    let tasks = [];
    for (const task of taskData) {
      if (task.id != id) {
        tasks.push(task);
      }
    }
    console.log(tasks);
    setTaskData(tasks);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={taskData}
              onUpdateTask={updateTaskData}
              onDeleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
