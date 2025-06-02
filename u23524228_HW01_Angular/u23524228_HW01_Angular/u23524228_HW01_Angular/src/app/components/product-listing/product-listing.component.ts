import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-listing', // defines the selector for this component
  templateUrl: './product-listing.component.html', // HTML template for this component
  styleUrls: ['./product-listing.component.css'], // CSS styles for this component
  standalone: false // shows if this component is standalone
})

export class ProductListingComponent implements OnInit 
{
  // array to hold the list of products
  products: Product[] = [];

  // putting the ProductService to interact with product data
  constructor(private productService: ProductService) {}

  
  ngOnInit(): void 
  {
    this.loadProducts(); // load products when the component initializes
  }

  // method to fetch and sort products by ID in descending order
  loadProducts(): void 
  {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.sort((a, b) => b.id - a.id); // Sort products by ID
    });
  }

  // method to delete a product by its ID and refresh the product list
  deleteProduct(id: number): void 
  {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts(); // reload products after deletion
    });
  }
}
