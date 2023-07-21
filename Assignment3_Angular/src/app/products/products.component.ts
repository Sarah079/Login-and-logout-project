import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from '../shared/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreService } from '../services/store.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import {LiveAnnouncer} from '@angular/cdk/a11y';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{

  products:Products[] = []  
  columnsToDisplay: string[] = ['productImage', 'productName', 'productPrice', 'productBrand', 'productType', 'productDescription'];
  dataSource = new MatTableDataSource<Products>(this.products);

 
  constructor(private prodservice: StoreService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.prodservice.GetProducts().subscribe(result =>{
      let prodlist:any[] = result
      prodlist.forEach((element)=>
      this.products.push(element))
      console.log(this.products);
      this.dataSource.data = this.products
    })
    console.log(this.dataSource)
  }

 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
}
