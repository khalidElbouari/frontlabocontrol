import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../../services/security/auth.service";
import {Product} from "../../../entities/Product";
import {Utilisateur} from "../../../entities/Utilisateur";
import {CartService} from "../../../services/cart/cart.service";
import {CartItem} from "../../../entities/CartItem";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  profilePictureUrl: string ='';
  @Input() cartItemCount: number = 0;
  @Output() cartUpdated: EventEmitter<void> = new EventEmitter<void>();


  constructor(protected authService: AuthService,private cartService: CartService) { }
  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.profilePictureUrl = localStorage.getItem('profilePictureUrl') ?? '/assets/favicon/defaultProfile.jpg';
  //  this.updateCartItemCount();

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
