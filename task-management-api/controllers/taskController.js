const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        const task = new Task({ title, description, priority });
        await task.save();
        res.json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, priority } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};
