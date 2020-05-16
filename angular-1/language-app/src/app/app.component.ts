import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'language-app';

  changeTab(event, currentTabId) {
    document.querySelectorAll('.nav-link').forEach(x=> {
      if(x !== event.target) {
        x.classList.remove('active');
      }else {
        x.classList.add('active');
      }
    });
    event.target.parentElement.classList.add()
    document.querySelectorAll('.tab').forEach(x => {
      if (x.id != currentTabId) {
        x.classList.add('hide')
      } else {
        x.classList.remove('hide')
      }
    });
  }
}
