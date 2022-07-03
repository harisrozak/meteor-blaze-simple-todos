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

    const userId = user ? user._id : this.userId;

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

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
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

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked: isChecked,
      },
    });
  },
});
