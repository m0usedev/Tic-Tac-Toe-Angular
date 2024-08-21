import { Component } from '@angular/core';
import { input } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})

export class ButtonComponent {
  //Componente con el que hacemos los botones
  @Input () click_func! : Function //funcion que realizara el boton al hacerle click
  //Inicialmente queria usar input de signals, pero por alguna razon pasarle funciones hacia cosas raras

  type     = input.required< string >() //tipo de boton que se desea en diseño
  disabled = input< boolean >(false) //si el boton debe estar desabilitado o no
}
