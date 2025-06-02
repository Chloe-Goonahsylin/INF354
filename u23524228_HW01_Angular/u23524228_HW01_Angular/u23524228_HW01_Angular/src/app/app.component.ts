import { Component } from '@angular/core'; // importing the Component decorator 
import { RouterOutlet } from '@angular/router'; // importing RouterOutlet for routing 

@Component({
  selector: 'app-root', // defines the custom HTML tag for this component
  // imports: [RouterOutlet], 
  templateUrl: './app.component.html', //  HTML template for this component
  styleUrl: './app.component.css', //  CSS file for this component
  standalone: false // indicates if this component is standalone or part of a module
})
export class AppComponent {
  title = 'u23524228_HW01_Angular'; // title property used in the component
}
