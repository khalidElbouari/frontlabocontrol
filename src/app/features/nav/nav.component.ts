import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/security/auth.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  profilePictureUrl: string ='';
  constructor(protected authService: AuthService) { }
  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.profilePictureUrl = localStorage.getItem('profilePictureUrl') ?? '/assets/favicon/defaultProfile.jpg';
  }

}
