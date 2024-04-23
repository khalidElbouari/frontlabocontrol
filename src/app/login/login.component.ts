import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from "../services/security/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
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

  handleLogin(){
    let username =this.formlogin.value.username;
    let password =this.formlogin.value.password;
    this.authservise.login(username,password).subscribe({
      next: data => {
        console.log(data);
        this.authservise.loadProfile(data);
        this.router.navigateByUrl("/admin")
        },
      error : err=>{
        console.log(err);
      }

    })

}
}
