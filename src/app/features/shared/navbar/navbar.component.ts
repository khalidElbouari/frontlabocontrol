import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/security/auth.service";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    SidebarComponent,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  profilePictureUrl: string ='';
  constructor(private authService: AuthService) { }
  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.profilePictureUrl = localStorage.getItem('profilePictureUrl') ?? '/assets/favicon/defaultProfile.jpg';
  }

}
