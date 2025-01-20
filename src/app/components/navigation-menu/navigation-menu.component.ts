import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  imports: [MatToolbarModule, RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {}
