import Todos from "../models/todos.model.js";
import {CreateError} from "../utils/error.js";

// Get all todos for the authenticated user
export const GetAllTodos = async (req, res, next) => {
    try {
        const todos = await Todos.find({ userId: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

// Get a single todo by ID
export const GetTodo = async (req, res, next) => {
    try {
        const todo = await Todos.findOne({ _id: req.params.id, userId: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

// Create a new todo
export const CreateTodo = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!title) {
            return next(new CreateError('404', 'Title is required'));
        }
        const newTodo = await Todos.create({
            title,
            userId: req.user._id,
            completed: false,
        });
        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
};

// Update an existing todo
export const UpdateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await Todos.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

// Delete a todo
export const DeleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await Todos.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        next(error);
    }
};
