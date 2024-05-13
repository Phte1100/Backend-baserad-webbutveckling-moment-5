import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsComponent } from '../tabs/tabs.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }
}