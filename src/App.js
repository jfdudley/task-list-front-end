import React, { useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com/tasks';

const taskApiToJson = (task) => {
  const { id, title, is_complete: isComplete, description } = task;
  return { id, title, isComplete, description };
};

const getTasks = () => {
  return axios
    .get(kBaseUrl)
    .then((response) => {
      return response.data.map(taskApiToJson);
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeComplete = (id, isComplete) => {
  const completeStatus = isComplete ? 'mark_complete' : 'mark_incomplete';

  return axios
    .patch(`${kBaseUrl}/${id}/${completeStatus}`)
    .then((response) => {
      return taskApiToJson(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const removeTask = (id) => {
  return axios.delete(`${kBaseUrl}/${id}`).catch((error) => {
    console.log(error);
  });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getTasks().then((tasks) => {
      setTaskData(tasks);
    });
  }, []);

  const updateTaskData = (updatedTask) => {
    changeComplete(updatedTask.id, updatedTask.isComplete).then(
      setTaskData((oldData) => {
        return oldData.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          } else {
            return task;
          }
        });
      })
    );
  };

  const deleteTask = (id) => {
    removeTask(id).then((task) => {
      setTaskData((oldData) => {
        return oldData.filter((task) => {
          return task.id !== id;
        });
      });
    });
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
