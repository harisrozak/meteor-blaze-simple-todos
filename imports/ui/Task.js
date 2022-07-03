import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import "./Task.html";

Template.task.events({
  "click .toggle-checked": function (event, instance) {
    // Set the checked property to the opposite of its current value.
    TasksCollection.update(instance.data._id, {
      $set: { isChecked: !instance.data.isChecked },
    });
  },
  "click .delete-task": function (event, instance) {
    TasksCollection.remove(instance.data._id);
  },
});
