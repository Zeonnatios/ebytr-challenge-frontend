import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import * as tasksAPI from '../services/tasksAPI';

function TasksProvider({ children }) {
  const [inputTask, setInputTask] = useState({
    task: '',
    description: '',
    status: '',
  });
  const [tasks, setTasks] = useState([]);
  const [actionButton, setActionButton] = useState({
    create: true,
    edit: false,
  });

  const sortAlphabeticalAsc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => a.task.localeCompare(b.task));
    setTasks(sortedTasks);
  };

  const sortAlphabeticalDesc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => b.task.localeCompare(a.task));
    setTasks(sortedTasks);
  };

  const sortByStatusAsc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => a.status.localeCompare(b.status));
    setTasks(sortedTasks);
  };

  const sortByStatusDesc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => b.status.localeCompare(a.status));
    setTasks(sortedTasks);
  };

  const parseDate = (date) => new Date(date);

  const sortByCreatedDateAsc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort(
      (a, b) => parseDate(a.createdDate) - parseDate(b.createdDate),
    );
    setTasks(sortedTasks);
  };

  const sortByCreatedDateDesc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort(
      (a, b) => parseDate(b.createdDate) - parseDate(a.createdDate),
    );
    setTasks(sortedTasks);
  };

  const getTaskById = (id) => {
    const data = [...tasks].find(({ _id }) => _id.toString() === id);
    return data;
  };

  const getAllTasks = async () => {
    const response = await tasksAPI.getAllTasks();
    setTasks(response);
  };

  const createNewTask = async (body) => {
    await tasksAPI.postTask(body);
    getAllTasks();
  };

  const updateTaskById = async (id, body) => {
    await tasksAPI.updateTaskById(id, body);
    getAllTasks();
  };

  const excludeTaskById = async (id) => {
    await tasksAPI.deleteTaskById(id);
    getAllTasks();
  };

  useEffect(() => {
    getAllTasks();
    return () => {
      setTasks([]);
    };
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    inputTask,
    setInputTask,
    tasks,
    setTasks,
    excludeTaskById,
    sortAlphabeticalAsc,
    sortByCreatedDateAsc,
    sortByStatusAsc,
    sortAlphabeticalDesc,
    sortByCreatedDateDesc,
    sortByStatusDesc,
    createNewTask,
    actionButton,
    setActionButton,
    getTaskById,
    updateTaskById,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TasksProvider;
