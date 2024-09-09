import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(TextPlugin);
  }

  ngAfterViewInit(): void {
    // Your GSAP animation code here
    gsap.to(".main-elem span:first-child", {
      duration: 3,
      text: "Welcome to,"
    });

    setTimeout(() => {
      gsap.to("#brand-text1", {
        duration: 1,
        text: "M"
      });

      gsap.to("#brand-text2", {
        duration: 1.75,
        text: "i"
      });

      gsap.to("#brand-text3", {
        duration: 2.25,
        text: "n"
      });

      gsap.to("#brand-text4", {
        duration: 3,
        text: "g"
      });

      gsap.to("#brand-text5", {
        duration: 3.75,
        text: "l"
      });

      gsap.to("#brand-text6", {
        duration: 4.5,
        text: "e"
      });
    }, 3000);
  }
}
