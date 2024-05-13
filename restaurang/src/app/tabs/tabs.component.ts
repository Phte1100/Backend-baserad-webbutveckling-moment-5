import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ThemePalette } from '@angular/material/core';



@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
  
})
export class TabsComponent {
  links = ['dashboard', 'menu-management', 'booking-management'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
}
