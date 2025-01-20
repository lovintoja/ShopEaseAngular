import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  imports: [MatToolbarModule, MatButtonModule, MatGridListModule, CommonModule],
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  currentYear = new Date().getFullYear();

  features = [
    {
      title: 'Wide Variety of Products',
      description: 'From electronics to fashion, we offer a diverse range of high-quality products.',
      image: 'https://via.placeholder.com/300x200?text=Products',
    },
    {
      title: 'Amazing Discounts',
      description: 'Enjoy great deals and discounts on your favorite items every day.',
      image: 'https://via.placeholder.com/300x200?text=Discounts',
    },
    {
      title: 'Fast Shipping',
      description: 'Get your orders delivered quickly with our reliable shipping services.',
      image: 'https://via.placeholder.com/300x200?text=Shipping',
    },
  ];
}
