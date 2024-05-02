import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/security/auth.service";
import {Utilisateur} from "../../entities/Utilisateur";
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
// public method
  SignUpOptions = [{image: 'google.svg', name: 'Google'}, {image: 'twitter.svg', name: 'Twitter'}, {image: 'facebook.svg', name: 'Facebook'}];
  formRegistration!: FormGroup;
   registrationErrorMessage!: string;
   registrationSuccessMessage: any;
constructor( private snackBar: MatSnackBar
  ,private authService:AuthService,private fb:FormBuilder) {
}

  ngOnInit(): void {
    this.formRegistration = this.fb.group({
      nom: this.fb.control(""),
      prenom: this.fb.control(""),
      profilePicture: [''],
      username: this.fb.control(""),
      password: this.fb.control(""),
    });
  }

  handleRegistration() {
    if (this.formRegistration.valid) {
      const utilisateur: Utilisateur = {
        nom: this.formRegistration.value.nom,
        prenom: this.formRegistration.value.prenom,
        datenaiss: null,
        // Don't include profilePicture here
        username: this.formRegistration.value.username,
        password: this.formRegistration.value.password,
        enabled: true
      };
      // Get the profile picture file from the form
      const file = this.formRegistration.value.profilePicture;
      this.authService.register(utilisateur, file).subscribe(
        response => {
          // Check if the response contains a message
          if (response.message) {
            // Display success message directly in the HTML template
            this.registrationSuccessMessage = response.message;

            // Optionally reset the form after successful registration
            this.formRegistration.reset();
          }
        },
        error => {
          console.error('Registration failed:', error);
          // Handle error here, such as displaying an error message
          // You can set an error message property and display it in the HTML template
          this.registrationErrorMessage = 'Registration failed. Please try again.';
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onPhotoChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.formRegistration.patchValue({ profilePicture: file });
    }
  }



}
