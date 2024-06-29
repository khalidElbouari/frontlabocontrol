import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from "../../services/security/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CartService} from "../../services/cart/cart.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  SignInOptions = [{image: 'google.svg', name: 'Google'}, {image: 'twitter.svg', name: 'Twitter'}, {image: 'facebook.svg', name: 'Facebook'}];

  formlogin!:FormGroup;
  loginError: string | null = null;

  constructor(private fb:FormBuilder,private authservise:AuthService,
              private router:Router,
              private cartService:CartService
              ) {}
  ngOnInit(): void {
    this.formlogin=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }
  handleLogin() {
    let username = this.formlogin.value.username;
    let password = this.formlogin.value.password;

    this.authservise.login(username, password).subscribe(
      (data: any) => {
        this.authservise.loadProfile(data);
        // If user is authenticated and there are cart items stored locally, process them
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        this.cartService.processCartItems(this.authservise.userId,cartItems).subscribe(() => {
        });
        // After processing, remove cart items from local storage
        localStorage.removeItem('cartItems');

        this.router.navigateByUrl("/labostore");
      },
      err => {
        console.error('Error:', err);
        this.loginError = 'Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.';
      }
    );
  }
}
