const Task = require('../models/taskModel');
const { sendMessage } = require('../services/sqsService');

const createTask = async (req, res) => {
  const { descricao } = req.body;
  const task = new Task({ descricao });
  try {
    await task.save();
    await sendMessage(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.scan().exec();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.get(id);
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
    const task = await Task.update({ id }, { descricao });
    await sendMessage(task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.delete(id);
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
