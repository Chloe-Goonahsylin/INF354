import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login.component';
import { RegisterComponent } from './authentication/register.component';
import { ProductListingComponent } from './products/product-listing.component';
import { AddProductsComponent } from './products/add-products.component';
import { ProductsComponent } from './reporting/products.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path:'productListing', component:ProductListingComponent},
  {path:'addProduct', component:AddProductsComponent},
  {path:'productReporting', component:ProductsComponent},
  {path: '', redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
