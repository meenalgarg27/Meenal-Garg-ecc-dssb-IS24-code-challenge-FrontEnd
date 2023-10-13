import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: productForm = new productForm();

  @ViewChild("productForm")
  productForm!: NgForm;

  isSubmitted: boolean = false;
  productId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['ProductId'];
    this.getProductById();
  }

  getProductById() {
    this.httpProvider.getProductById(this.productId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editProductForm.productId = resultData.productId;
          this.editProductForm.productName = resultData.productName;
          this.editProductForm.productOwnerName = resultData.productOwnerName;
          this.editProductForm.developers = resultData.developers;
          this.editProductForm.scrumMasterName = resultData.scrumMasterName;
          this.editProductForm.startDate = resultData.startDate;
          this.editProductForm.methodology = resultData.methodology;
          this.editProductForm.location = resultData.location;

        }
      }
    },
      (error: any) => { });
  }
  addDeveloper(developer: string) {
    if (developer) {
      this.editProductForm.developers.push(developer);
    }
  }

  EditProduct(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveProduct(this.editProductForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          console.log(resultData);
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
  productId: number = 0;
  productName: string = "";
  productOwnerName: string = "";
  developers: string[] = [];
  scrumMasterName: string = "";
  startDate: string = "";
  methodology: string = "";
  location: string = "";
}
