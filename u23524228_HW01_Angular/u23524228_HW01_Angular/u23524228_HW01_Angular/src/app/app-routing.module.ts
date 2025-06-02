import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component'; 
import { AddProductComponent } from './components/add-product/add-product.component'; 
import { EditProductComponent } from './components/edit-product/edit-product.component'; 

// define application routes
const routes: Routes = [
    
    {path: "", redirectTo: "/products", pathMatch: "full"}, // redirect route url to the products listing page
    
    {path: "products", component: ProductListingComponent}, // route for the product listing page
    
    {path: "addProduct", component: AddProductComponent}, // Route for adding a new product
    
    {path: "editProduct/:id", component: EditProductComponent}, // route for editing an existing product by ID
];

@NgModule({
    
    imports: [RouterModule.forRoot(routes)], // Import the routes into the application
    
    exports: [RouterModule] // export the routerModule to make it available throughout the app
})
export class AppRoutingModule { }