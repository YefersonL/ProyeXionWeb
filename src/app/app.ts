import { Component , signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importar FormsModule

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],  // Agregar FormsModule aquí
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Plantilla1_Angular');
}
