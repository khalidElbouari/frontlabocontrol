import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Utilisateur} from "../../entities/Utilisateur";
import {map, Observable} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated : boolean=false;
  userId!:number;
  roles : any;
  username : any;
  accessToken! : string;
  fullName!:string;
  imageData!: Uint8Array; // Change the type to Uint8Array


  constructor(private http:HttpClient,private router: Router) {
    // Subscribe to NavigationEnd event to trigger token expiration check after each navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadTokenFromLocalStorage();
      }
    });
  }
  public login(username: String,password: String){
    let options={
     headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    // @ts-ignore
    let params =new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8055/auth/login",params,options);
  }
  loadProfile(data: any) {
    this.isAuthenticated=true;
    this.accessToken= data['access-token'];
    let decodedJwt:any= jwtDecode(this.accessToken);
    this.username=decodedJwt.sub;
    this.userId=decodedJwt.userId;
    this.roles=decodedJwt.scope;
    this.fullName=decodedJwt.fullName;
    this.imageData = this.base64ToArrayBuffer(data['imageData']);
    // Store access token in local storage
    localStorage.setItem('accessToken', data['access-token']);
    localStorage.setItem('userData', JSON.stringify(data));

    console.log(data);
    console.log(decodedJwt);
  }
  // Function to convert base64 to Uint8Array
  base64ToArrayBuffer(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  register(utilisateur: any, profilePicture: File): Observable<any> {
    const formData = new FormData();
    formData.append('nom', utilisateur.nom);
    formData.append('prenom', utilisateur.prenom);
    formData.append('username', utilisateur.username);
    formData.append('password', utilisateur.password);
    formData.append('profilePicture', profilePicture);
    return this.http.post<any>('http://localhost:8055/auth/register', formData);
  }


  logout() {
    // Clear authentication state
    this.isAuthenticated = false;
    this.username=undefined;
    this.roles=undefined;
    // Remove stored tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('cartItems');
    // Navigate to login page
    this.router.navigateByUrl( '/labostore');
  }


  loadTokenFromLocalStorage() {
    let token = localStorage.getItem("accessToken");
    let data = JSON.parse(localStorage.getItem("userData") || '{}'); // Retrieve the entire data object from local storage

    if (token) {
      if (this.isTokenExpired(token)) {
        alert('Your session has expired. Please log in again.');
        this.isAuthenticated = false;
        this.username = undefined;
        this.roles = undefined;
        localStorage.removeItem('accessToken');
        this.router.navigateByUrl("/login");
      } else {
        this.loadProfile(data); // Pass the entire data object to loadProfile
      }
    }
  }


  isTokenExpired(token: string): boolean {
    let decodedToken: any = jwtDecode(token);
    let currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }
}
