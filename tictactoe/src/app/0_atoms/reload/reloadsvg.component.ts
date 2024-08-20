import { Component, input } from '@angular/core';

@Component({
  selector: 'svg-reload',
  standalone: true,
  imports: [],
  template: `
    <svg [style.width.px]="width()" [style.height.px]="height()" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 0V2.22222C14.7878 2.22222 18.2778 5.71111 18.2778 10C18.2778 14.2889 14.7878 17.7778 10.5 17.7778C6.21222 17.7778 2.72222 14.2889 2.72222 10C2.72222 7.94778 3.53889 6.01555 4.94445 4.57555V7.22222H7.16667V1.11111H1.05555V3.33333H3.04555C1.42333 5.14667 0.5 7.51 0.5 10C0.5 15.5133 4.98555 20 10.5 20C16.0144 20 20.5 15.5133 20.5 10C20.5 4.48667 16.0144 0 10.5 0Z" fill="black"/>
    </svg>`
})
export class ReloadSvgComponent {
  width = input(20)
  height = input(20)
}
