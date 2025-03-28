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
exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status, priority } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status, priority },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
