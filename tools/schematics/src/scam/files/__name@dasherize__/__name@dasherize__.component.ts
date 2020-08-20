import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    <% if (project === 'geek-platform') { %>selector: 'app-<%= dasherize(name) %>',<% } %><% if (project !== 'geek-platform') { %>selector: '<%= dasherize(project) %>-<%= dasherize(name) %>',<% } %>
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(name) %>Component {

}
