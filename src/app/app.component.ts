import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./components/form/form.component";

@Component({
  selector: 'app-root',
  imports: [FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'intent-recognition';
}
