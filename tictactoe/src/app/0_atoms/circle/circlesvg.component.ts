import { Component, input } from '@angular/core';

@Component({
  selector: 'svg-circle',
  standalone: true,
  imports: [],
  template: `
    <svg [style.width.px]="width()" [style.height.px]="height()" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 34C64 50.5687 50.5687 64 34 64C17.4315 64 4 50.5687 4 34C4 17.4315 17.4315 4 34 4C50.5687 4 64 17.4315 64 34Z" stroke="#4C89D9" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
})
export class CircleSvgComponent {
  width = input(80)
  height = input(80)
}
