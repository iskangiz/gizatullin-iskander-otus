import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinks: any[];
  title = 'language-app';

  constructor() {
    this.navLinks = [
      {
        label: 'Recently Added',
        path: './recently-added',
        index: 0
      }, {
        label: 'Go',
        path: './go',
        index: 1
      }, {
        label: 'Settings',
        path: './settings',
        index: 2
      },
    ];
  }
}
