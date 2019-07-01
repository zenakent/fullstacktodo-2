const express = require("express");
const router = express.Router();
const db = require("../models/todo");

/* view todo API. */
router.get("/", async function(req, res, next) {
  try {
    let todos = await db.find({});
    res.send(todos);
  } catch (error) {
    console.log(error);
  }
});

//create todo
router.post("/", async function(req, res) {
  try {
    let todo = await db.create(req.body);
    console.log(todo);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

//complete todo
router.put("/:todoId/complete", async function(req, res) {
  try {
    let todo = await db.findById(req.params.todoId);
    todo.completed = !todo.completed;
    todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

//edit todo
router.put("/:todoId/edit", async function(req, res) {
  try {
    let todo = await db.findByIdAndUpdate(req.params.todoId, req.body);
    todo.todo = req.body.todo;
    todo.save();
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

//delete todo
router.delete("/:todoId/delete", async function(req, res) {
  try {
    let todo = await db.findByIdAndDelete(req.params.todoId);
    res.json({ message: "deleted the todo" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
