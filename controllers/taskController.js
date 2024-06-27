const TaskModel = require('../models/taskModel');
const { sendMessage } = require('../services/sqsService');

// Cria uma nova tarefa
const createTask = async (req, res) => {
  const { descricao } = req.body;

  try {
    if (!descricao) {
      return res.status(400).json({ error: 'Missing required fields: descricao' });
    }

    const task = new TaskModel({ descricao });
    await task.create();
    await sendMessage(task.task); 

    res.status(201).json(task.task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const taskModel = new TaskModel();
    const tasks = await taskModel.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const taskModel = new TaskModel();
    const task = await taskModel.getById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  try {
    if (!descricao) {
      return res.status(400).json({ error: 'Missing required field: descricao' });
    }

    const taskModel = new TaskModel({ id, descricao });
    await taskModel.update();
    await sendMessage({ id, descricao }); 

    res.status(200).json(taskModel.task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const taskModel = new TaskModel();
    await taskModel.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
