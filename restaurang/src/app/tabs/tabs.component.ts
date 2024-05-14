import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'], // Se till att det är "styleUrls" i plural
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent {
  links = ['dashboard', 'menu-management', 'booking-management'];
  activeLink = this.links[0];

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
}
