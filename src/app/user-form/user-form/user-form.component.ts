import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserManagementService } from 'src/app/core/Service/user-management.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public userForm!: FormGroup
  public submitted:boolean=false;
  constructor(public usermanagementservice:UserManagementService,private dialogRef: MatDialogRef<UserFormComponent>) {
   }
get f(){
  return this.userForm;
}
  ngOnInit(): void {
    this.userForm=new FormGroup({
      name: new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z\\s]+$/)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      role: new FormControl(null,[Validators.required]),
    })
  }
  public onSubmit(){
    this.submitted=true;
    if(!this.userForm.invalid){
    this.usermanagementservice.addState(this.userForm.value)
    this.dialogRef.close();
    }
  }
  public closePopUp(){
    this.dialogRef.close();
  }

}
@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule,MatAutocompleteModule],
  declarations: [UserFormComponent],
})
export class UserFormModule {}
