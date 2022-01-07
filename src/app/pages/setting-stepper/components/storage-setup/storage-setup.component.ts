import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'storage-setup',
  templateUrl: './storage-setup.component.html',
  styleUrls: ['./storage-setup.component.css']
})
export class StorageSetupComponent implements OnInit {

  storageSetupDetails!: FormGroup;
  isStorageDetailsSubmitted = false;
  storageSelectArray = [
    { id: 1, name: "AWS" },
    { id: 2, name: "Cloud" },
  ];
  constructor(private formBuilder: FormBuilder, public router: Router, private toastrService: ToastrService,) { }
  ngOnInit(): void {
    this.storageSetupDetails = this.formBuilder.group({
      storageSetup: ["", Validators.required],
    });
  }
  get storageSetupFormControl() {
    return this.storageSetupDetails.controls;
  }
  backfunc(){
    this.router.navigate(['/settingStepper']);
  }
  StorageDetailsSubmit(storageSetupValue: any) {
    this.isStorageDetailsSubmitted = true;
    console.log(this.storageSetupDetails.valid);
    if (this.storageSetupDetails.valid) {
      console.log(storageSetupValue.value);
      console.log(this.storageSetupDetails);
      this.toastrService.success("Data Inserted Successfully!", "", {
        timeOut: 2000,
      });
    }
  }
}
