import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home', // Identifies the component in templates
  templateUrl: './home.page.html', // HTML template for the component
  styleUrls: ['./home.page.scss'], // Styles specific to this component
  standalone: false,
})
export class HomePage implements OnInit {

  constructor() { } // Initializes the component

  ngOnInit() {
    // Lifecycle hook that runs when the component is initialized
  }
}
