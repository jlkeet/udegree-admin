import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NotificationIconComponent } from './notification-counter/notification-counter.component';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet> </router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
