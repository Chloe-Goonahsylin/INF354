import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartData, ChartOptions } from 'chart.js';
import { APIService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  chartsLoaded:boolean = false; // Controls when charts and lists are shown
  brands:any[] = [] // Stores brand data for chart
  productTypes:any[] = [] // Stores product type data for chart
  products:any[] = [] // Stores top 10 most expensive products
  groupedProducts: { [brandName: string]: { [productType: string]: any[] } } = {}; // Used for grouping (not currently used)

  constructor(private apiService: APIService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.GenerateProductReport() // Load report data on component init
    console.log(this.brands)
    console.log(this.productTypes)
    console.log(this.products)
    console.log(this.groupedProducts)
  }

  // Chart data and options for brands
  brandData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [], label:'Brands', backgroundColor: '#90E0EF' },
    ],
  };

  brandChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Brands',
      },
    },
  };

  // Chart data and options for product types
  productTypeData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Product Types', backgroundColor: '#00B4D8' },
    ],
  };

  productTypeChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Product Type',
      },
    },
  };

  // Fetch report data from API and populate charts and product list
  GenerateProductReport()
  {
    this.apiService.GenerateProductReport().subscribe(result => {
      let brandData:any[] = result[0]
      let productTypeData:any[] = result[1]
      let top10Products:any[] = result[2]

      // Populate brand chart data
      brandData.forEach((element) => {
        this.brandData.labels?.push(element.key)
        this.brandData.datasets[0].data.push(element.productCount)
        this.brands.push(element)
      });

      // Populate product type chart data
      productTypeData.forEach((element) => {
        this.productTypeData.labels?.push(element.key)
        this.productTypeData.datasets[0].data.push(element.productCount)
        this.productTypes.push(element)
      });

      // Use top 10 products for the product list
      this.products = top10Products;

      this.chartsLoaded = true; // Show charts and product list
      // this.groupProducts() // <-- not used
    }, (response: HttpErrorResponse) => {
        if (response.status === 500){
          this.snackBar.open(response.error, 'X', {duration: 5000}); // Show error if server fails
        }
    })
  }

  // (Not currently used) Group products by brand and type
  groupProducts() {
    for (const product of this.products) {
      if (!this.groupedProducts[product.brandName]) {
        this.groupedProducts[product.brandName] = {};
      }
      if (!this.groupedProducts[product.brandName][product.productTypeName]) {
        this.groupedProducts[product.brandName][product.productTypeName] = [];
      }
      this.groupedProducts[product.brandName][product.productTypeName].push(product);
    }
  }

}
