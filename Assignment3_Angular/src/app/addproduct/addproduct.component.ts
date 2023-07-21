import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Products } from '../shared/product';
import { StoreService } from '../services/store.service';
import { Brands } from '../shared/brands';
import { ProductTypes } from '../shared/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})

export class AddproductComponent implements OnInit{
  brands: Brands[] =[];
  types: ProductTypes[] =[];
  Cimage:string = "";
  brandcontrol= new FormControl<Brands |null>(null, Validators.required);    
  typecontrol= new FormControl<ProductTypes |null>(null, Validators.required);

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),    
    brand: new FormControl('', [Validators.required]),
    producttype: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
    
  });

 

  constructor(private prodservice: StoreService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getproddata()
   
  }

getproddata(){
  this.prodservice.getBrands().subscribe(bresult =>{
    this.brands = bresult;
  })
  this.prodservice.getTypes().subscribe(tresult =>{
    this.types = tresult;
  })
}
selectedType = '';
typeid: number = 0;
onTypeSelected(value:string): void {
  if(value == "Footwear"){
    this.typeid = 1
  }
  else if(value == "Clothing")
  {
    this.typeid = 2
  }
  else if(value == "Accessories")
  {
    this.typeid = 3
  }
  this.selectedType = value;
}

selectedBrand = '';
brandid: number = 0;
onBrandSelected(value:string):void{
  if(value == "Nike"){
    this.brandid = 1
  }
  else if(value == "Adidas")
  {
    this.brandid = 2
  }
  else if(value == "Levi Strauss & Co.")
  {
    this.brandid = 3
  }
  this.selectedBrand = value;
}
 
  submit()
  {
      if(this.form.valid)
      {
        let newproduct = new Products();

        newproduct.productName = this.form.value.name;
        newproduct.productBrand = this.brandid;
        newproduct.productDescription = this.form.value.description;
        newproduct.productImage = this.Cimage;
        newproduct.productPrice = this.form.value.price;
        newproduct.productType = this.typeid;        

        this.prodservice.AddProduct(newproduct).subscribe(result =>{
          console.log(result);  
          if(result.Status == "Success"){
            this.router.navigateByUrl('/products');
          }
          else if (result.Status == "Error"){
            this.router.navigateByUrl('/products');
            this._snackBar.open("Adding Failed!", "Close");
          }         
        });
      }

  }

  //getfile
  onFileSelected(event:any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.Cimage = base64;
    });
  }
 //convert file into string
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));
    return result;
  }
}
