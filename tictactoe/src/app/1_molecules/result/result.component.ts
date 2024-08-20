import { Component, input  } from '@angular/core';
import {NgIf} from '@angular/common';

import { Result } from '../../../utilites/ts/alias';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  result = input.required< Result >()
}
