import { Component, OnInit } from '@angular/core';
import { FarmerDetailsService } from '../../../services/farmer-details/farmer-details.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-farmer-alternate-mobile',
  templateUrl: './farmer-alternate-mobile.component.html',
  styleUrls: ['./farmer-alternate-mobile.component.css'],
  providers:[FarmerDetailsService]
})
export class FarmerAlternateMobileComponent implements OnInit {

  public searchedFarmerId: string="KKDFARM1000";
  rForm: FormGroup;

  constructor(private farmerDetailsService : FarmerDetailsService,private fb: FormBuilder,public router: Router) {
    this.rForm = fb.group({
      alternateMobileNumber :[null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
  })
  }
   /* Function to update farmer's mobile number by his KKDId
  and make service call to update farmer's mobile number from app */
  updateFarmerMobile(post){
    this.farmerDetailsService.getFarmerName(this.searchedFarmerId)
             .subscribe((res) =>{
                   res.alternateNo = post.alternateMobileNumber;
                   this.farmerDetailsService.updateFarmerMobile(this.searchedFarmerId,res)
                   .subscribe((updatedInfo) =>{
                    swal({
                      position: 'top',
                      type: 'success',
                      title: 'Your alternate mobile number has updated',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.router.navigate(['/farmer/dashboard']);
                     }, (error) =>{
                      swal({
                        type: 'error',
					              title: 'Oops...',
					              text: 'Something went wrong',
                      })
                     });
             }, (error) =>{
              swal({
                type: 'error',
                title: 'Oops...',
                text: 'Server down',
                footer: 'Try Again Later......',
              })
             });
  }
  ngOnInit() {
  }
}
