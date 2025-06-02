import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products';

@Component({
  selector: 'app-edit-product', // component selector used in templates
  templateUrl: './edit-product.component.html', // HTML template for the component
  styleUrls: ['./edit-product.component.css'], // CSS styles for the component
  standalone: false
})

export class EditProductComponent implements OnInit 
{
  // defines a product object with default values
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0
  };

  
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void 
  {
    // get the product ID from the route parameters
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    
    if(productId) 
    {
        // fetchs the product details by ID and assign it to the product object
        this.productService.getProductById(productId).subscribe((data: Product) => {
          this.product = data;
        });
    }
  }

  // handle form submission to update the product
  onSubmit(): void 
  {
    this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
      alert('Product updated successfully!'); // Notify the user
      this.router.navigate(['/products']); // Navigate back to the products list
    });
  }

  // handle cancel action to navigate back to the products list
  onCancel(): void 
  {
    this.router.navigate(['/products']);
  }
}