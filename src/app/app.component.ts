import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SampleComponent } from './3_organisms/sample/sample.component';
import { TictactoeComponent } from './3_organisms/tictactoe/tictactoe.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SampleComponent,
    TictactoeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

}
