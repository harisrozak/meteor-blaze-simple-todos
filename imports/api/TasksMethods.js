import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  "task.insert": function (text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.insert({
      text: text,
      createAt: new Date(),
      userId: this.userId,
    });
  },
  "task.remove": function (taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.remove(taskId);
  },
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
