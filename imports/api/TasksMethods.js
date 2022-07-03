import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  /**
   * Insert task
   *
   * @param {String} text
   * @param {Object} user
   */
  "task.insert": function (text, user = null) {
    check(text, String);

    let userId = this.userId;

    // If the user param is defined.
	if (user && typeof user._id !== "undefined") {
      userId = user._id;
    }

    // Must be an authorized user.
    if (!userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.insert({
      text: text,
      createAt: new Date(),
      userId: userId,
    });
  },

  /**
   * Remove task
   *
   * @param {String} taskId
   */
  "task.remove": function (taskId) {
    check(taskId, String);

    // Must be an authorized user.
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // Must be an authorized user.
    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.remove(taskId);
  },

  /**
   * Set isChecked value
   *
   * @param {String} taskId
   * @param {Boolean} isChecked
   */
  "task.setIsChecked": function (taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    // Must be an authorized user.
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    // Must be an authorized user.
    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked: isChecked,
      },
    });
  },
});
