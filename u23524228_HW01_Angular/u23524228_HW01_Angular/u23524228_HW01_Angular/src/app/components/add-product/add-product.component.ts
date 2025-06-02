import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products';

// define metadata for the AddProductComponent
@Component({
  selector: 'app-add-product', // The selector used in HTML to include this component
  templateUrl: './add-product.component.html', // Path to the HTML template
  styleUrls: ['./add-product.component.css'], // Path to the CSS styles
  standalone: false // Indicates whether this component is standalone
})

export class AddProductComponent 
{
  // Define a product object with default values
  product: Product = { 
    id: 0, // default ID
    name: '', // default name
    description: '', // default description
    price: 0 // default price
  };

  
  constructor(private productService: ProductService, private router: Router){}

  // Method to handle form submission
  onSubmit(): void 
  {
    // calls the addProduct method from ProductService and navigate to the products page if successful
    this.productService.addProduct(this.product).subscribe(() => {
      alert('Product added successfully'); // notify the user
      this.router.navigate(['/products']); // navigate to the products page
    });
  }

  onCancel(): void //cancel action
  {
    this.router.navigate(['/products']); //  back to the products page
  }
}