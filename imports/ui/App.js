import { Template } from "meteor/templating";
import { TasksCollection } from "../api/TasksCollection";
import { ReactiveDict } from "meteor/reactive-dict";

import "./App.html";
import "./Task.js";
import "./Login.js";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser(); // !! means absolute boolean.
const getTasksFilter = () => {
  const user = getUser();
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  return { userFilter, pendingOnlyFilter };
};

Template.mainContainer.onCreated(function () {
  this.state = new ReactiveDict();
});

Template.mainContainer.helpers({
  tasks: function () {
    const instance = Template.instance();
    const hideCompleted = instance.state.get("hideCompleted");
    const { pendingOnlyFilter, userFilter } = getTasksFilter();

    if (!isUserLogged()) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createAt: -1 },
      }
    );
  },
  hideCompleted: function () {
    return Template.instance().state.get("hideCompleted");
  },
  incompleteCount: function () {
    if (!isUserLogged()) {
      return "";
    }

    const { pendingOnlyFilter } = getTasksFilter();

    const incompleteTasksCount =
      TasksCollection.find(pendingOnlyFilter).count();

    return incompleteTasksCount ? `(${incompleteTasksCount})` : "";
  },
  isUserLogged: function () {
    return isUserLogged();
  },
  userData: function () {
    return getUser();
  },
});

Template.mainContainer.events({
  "click #hide-completed-button": function (event, instance) {
    // Undefined means false.
    const currentHideCompleted = instance.state.get("hideCompleted");

    // Set the the opposite of the current value as a new value.
    instance.state.set("hideCompleted", !currentHideCompleted);
  },
  "click .user": function (event, instance) {
    Meteor.logout();
  },
});

Template.taskForm.events({
  "submit .task-form": function (event, instance) {
    // Prevent default browser form submit.
    event.preventDefault();

    // Get value from element
    const target = event.target;
    const taskText = target.taskText.value;
    const user = getUser();

    // Insert a task into collection.
    TasksCollection.insert({
      text: taskText,
      userId: user._id,
      createAt: new Date(),
    });

    // Clear form.
    target.taskText.value = "";
  },
});
