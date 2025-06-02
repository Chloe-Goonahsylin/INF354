import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brands } from '../shared/brands';
import { ProductTypes } from '../shared/product-types';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
   formData = new FormData(); // Used for file uploads
   brandsData:Brands[]=[] // List of brands for dropdown
   productTypesData:ProductTypes[]=[] // List of product types for dropdown
   fileNameUploaded = '' // Stores uploaded file name

  // Reactive form for product details
  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    file: ['', Validators.required],
    price: ['', Validators.required],
    brand: [null, Validators.required],
    producttype: [null, Validators.required],
    description: ['', Validators.required]
  })

  constructor(private apiService: APIService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GetBrands() // Load brands on init
    this.GetProductTypes() // Load product types on init
  }

  // Fetch brands from API
  GetBrands(){
    this.apiService.getBrands().subscribe(result => {
      let brandList:any[] = result
      brandList.forEach((element) => {
        this.brandsData.push(element)
      });
    });
  }

  // Fetch product types from API
  GetProductTypes(){
    this.apiService.getProductTypes().subscribe(result => {
      let productTypeList:any[] = result
      productTypeList.forEach((element) => {
        this.productTypesData.push(element)
      });
    });
  }

  // Handle file upload
  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name
  }

  // Called when user submits the form
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('price', this.productForm.get('price')!.value);
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('brand', this.productForm.get('brand')!.value);
      formData.append('producttype', this.productForm.get('producttype')!.value);

      // Append file if selected
      const fileControl = this.productForm.get('file');
      if (fileControl && fileControl.value && fileControl.value.length > 0) {
        formData.append('file', fileControl.value[0]);
      }

      // Call API to add product
      this.apiService.addProduct(formData).subscribe(() => {
        this.clearData(); // Reset form and data
        this.router.navigateByUrl('productListing').then((navigated: boolean) => {
          if (navigated) {
            this.snackBar.open(this.productForm.get('name')!.value + ` created successfully`, 'X', { duration: 5000 });
          }
        });
      });
    }
  }

  // Reset form and file data
  clearData() {
    this.formData = new FormData(); // Completely reset FormData
    this.fileNameUploaded = '';
    this.productForm.reset();
  }

}
