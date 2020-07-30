"use strict";

const connectDB = require("./db");
const { connect } = require("mongodb");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };

    const newCouse = Object.assign(defaults, input);

    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection("courses").insertOne(newCouse);
      newCouse._id = course.insertedId;
    } catch (error) {
      console.error(message.error);
    }
    return newCouse;
  },
};
