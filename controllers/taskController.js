const TaskModel = require('../models/taskModel');

// Cria uma nova tarefa
const createTask = async (req, res) => {
  const { id, descricao } = req.body;

  try {
    if (!id || !descricao) {
      return res.status(400).json({ error: 'Missing required fields: id and descricao' });
    }

    const task = new TaskModel({ id, descricao });
    await task.create();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtém todas as tarefas
const getTasks = async (req, res) => {
  try {
    const taskModel = new TaskModel();
    const tasks = await taskModel.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtém uma tarefa pelo ID
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

// Atualiza uma tarefa pelo ID
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  try {
    if (!descricao) {
      return res.status(400).json({ error: 'Missing required field: descricao' });
    }

    const taskModel = new TaskModel({ id, descricao });
    await taskModel.update();

    res.status(200).json(taskModel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deleta uma tarefa pelo ID
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
