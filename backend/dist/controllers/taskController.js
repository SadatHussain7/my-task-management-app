"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const task_1 = __importDefault(require("../models/task"));
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new task_1.default(req.body);
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createTask = createTask;
// Get all tasks or filter by status
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.query;
    const filter = status ? { status } : {};
    try {
        const tasks = yield task_1.default.find(filter);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getTasks = getTasks;
// Update a task by ID
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "status"];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        res.status(400).json({ error: "Invalid updates!" });
        return;
    }
    try {
        const task = yield task_1.default.findById(id);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        updates.forEach((update) => (task[update] = req.body[update]));
        yield task.save();
        res.status(200).json(task);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateTask = updateTask;
// Delete a task by ID
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield task_1.default.findByIdAndDelete(id);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteTask = deleteTask;
