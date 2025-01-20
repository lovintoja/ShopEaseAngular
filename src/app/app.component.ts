import { Component } from '@angular/core';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NavigationMenuComponent, RouterOutlet],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Store';
}
