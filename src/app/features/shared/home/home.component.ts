import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  scrollTo(id: string): void {
    const element = this.el.nativeElement.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = this.el.nativeElement.querySelector('#scrollspyNav');
    if (window.scrollY > 0) {
      this.renderer.addClass(navbar, 'navbar-scroll');
    } else {
      this.renderer.removeClass(navbar, 'navbar-scroll');
    }
  }
}
