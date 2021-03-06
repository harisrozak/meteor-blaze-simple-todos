import { Template } from "meteor/templating";
import "./TaskForm.html";

/**
 * Events.
 * Handle template events.
 */
Template.taskForm.events({
  "submit .task-form": function (event, instance) {
    // Prevent default browser form submit.
    event.preventDefault();

    // Get value from element
    const target = event.target;
    const taskText = target.taskText.value;

    // Insert a task into collection.
    Meteor.call("task.insert", taskText);

    // Clear form.
    target.taskText.value = "";
  },
});
