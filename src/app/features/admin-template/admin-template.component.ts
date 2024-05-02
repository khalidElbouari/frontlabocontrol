import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
