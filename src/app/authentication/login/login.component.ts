import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from "../../services/security/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  SignInOptions = [{image: 'google.svg', name: 'Google'}, {image: 'twitter.svg', name: 'Twitter'}, {image: 'facebook.svg', name: 'Facebook'}];

  formlogin!:FormGroup;
  constructor(private fb:FormBuilder,private authservise:AuthService,
              private router:Router) {
  }
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
        this.router.navigateByUrl("/category");
      },
      err => {
        console.error("Error:", err);
      }
    );
  }
}
