import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  imports: [MatToolbarModule, MatButtonModule, MatGridListModule, CommonModule, RouterLink],
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  currentYear = new Date().getFullYear();

  features = [
    {
      title: 'Wide Variety of Products',
      description: 'From electronics to fashion, we offer a diverse range of high-quality products.',
      image: '/assets/products_variety.jpg',
    },
    {
      title: 'Amazing Discounts',
      description: 'Enjoy great deals and discounts on your favorite items every day.',
      image: '/assets/deals.jpg',
    },
    {
      title: 'Fast Shipping',
      description: 'Get your orders delivered quickly with our reliable shipping services.',
      image: '/assets/fast_delivery.jpg',
    },
  ];
}
