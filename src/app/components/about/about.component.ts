import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, CommonModule],
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  team = [
    { name: 'Jane Doe', role: 'CEO', image: 'assets/jane.jpg' },
    { name: 'John Smith', role: 'CTO', image: 'assets/john.jpg' },
    { name: 'Emily Brown', role: 'Lead Designer', image: 'assets/emily.jpg' },
    { name: 'Michael Lee', role: 'Marketing Manager', image: 'assets/michael.jpg' }
  ];
} 
 