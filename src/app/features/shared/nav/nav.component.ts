import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../services/security/auth.service";
import {Product} from "../../../entities/Product";
import {Utilisateur} from "../../../entities/Utilisateur";

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

  getImageSrc(): string {
    if (this.authService.imageData && this.authService.imageData.length > 0) {
      const blob = new Blob([this.authService.imageData], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } else {
      return 'assets/placeholder-image.jpg'; // Replace with your placeholder image path
    }
  }




}
