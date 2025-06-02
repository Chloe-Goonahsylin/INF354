import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductListing } from '../shared/product-listing';
import { APIService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements AfterViewInit, OnInit {
  // Columns to display in the table
  displayedColumns: string[] = ['image', 'name', 'price','brand', 'productTypeName', 'description'];
  // Data source for the table
  dataSource = new MatTableDataSource<ProductListing>();
  constructor(private apiService: APIService) { }

  // Reference to paginator and sort components
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Fetch products from API when component initializes
  ngOnInit(): void {
    this.apiService.getProducts().subscribe((products:any) => {this.dataSource.data = products});
  }

  // Set up paginator and sorting after view initializes
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Apply filter to the table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
