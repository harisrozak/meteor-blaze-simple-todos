import { Template } from "meteor/templating";
import "./Task.html";

/**
 * Events.
 * Handle template events.
 */
Template.task.events({
  "click .toggle-checked": function (event, instance) {
    Meteor.call("task.setIsChecked", instance.data._id, !instance.data.isChecked);
  },
  "click .delete-task": function (event, instance) {
	Meteor.call("task.remove", instance.data._id);
  },
});
