import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../services/basket.service';


@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  imports: [MatToolbarModule, RouterLink, MatButtonModule, MatIconModule, MatMenuModule, CommonModule],
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit{
  isLoggedIn: boolean = false;
  basketItemsAmount: number = 0;

  constructor(private authService: AuthService, 
    private basketService: BasketService, 
    private router: Router) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.basketService.getItemsAmount().subscribe(amount => {
      this.basketItemsAmount = amount;
    });
  }

  onLogout(): void {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
