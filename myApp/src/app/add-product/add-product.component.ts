import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: productForm = new productForm();

  @ViewChild("productForm")
  productForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  addDeveloper(developer: string) {
    if (developer) {
      this.addProductForm.developers.push(developer);
    }
  }

  AddProduct(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveProduct(this.addProductForm).subscribe(async data => {
        if (data != null && data.body != null) {
            var resultData = data.body;
            this.router.navigate(['/Home']);
          
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

export class productForm {
  productName: string = "";
  productOwnerName: string = "";
  developers: string[] = [];
  scrumMasterName: string = "";
  startDate: string = "";
  methodology: string = "";
  location : string = "";
}