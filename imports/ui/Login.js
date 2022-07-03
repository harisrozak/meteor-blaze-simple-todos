import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import "./Login.html";

/**
 * Events.
 * Handle template events.
 */
Template.login.events({
  "submit .login-form": function (event) {
    event.preventDefault();

    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password);
  },
});
