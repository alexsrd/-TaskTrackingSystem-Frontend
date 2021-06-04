import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {UserProfile} from "../../models/user-profile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  formModel!: FormGroup;
  user!:UserProfile;
  constructor(public dialogRef: MatDialogRef<AdminPanelComponent>,
              @Inject(MAT_DIALOG_DATA) public userEdit:UserProfile,
              private fb:FormBuilder)
  {
    this.formModel = this.fb.group({
      Name: ["", Validators.required],
      Surname: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
    });
    this.user = userEdit;
    this.formModel.controls['Name'].setValue(userEdit.name);
    this.formModel.controls['Surname'].setValue(userEdit.surname);
    this.formModel.controls['Email'].setValue(userEdit.email);
  }

  editUser()
  {
    let user:UserProfile ={
      name: this.formModel.controls['Name'].value,
      surname: this.formModel.controls['Surname'].value,
      email: this.formModel.controls['Email'].value,
      fullName: this.formModel.controls['Name'].value + ' ' + this.formModel.controls['Surname'].value,
      role:this.user.role
    }
    this.dialogRef.close(user);
  }

  ngOnInit(): void {

  }

  getNameErrorMessage(control:string):string
  {
    let password = this.formModel.controls[control];
    if(password.hasError('required')){
      return  'You must enter a value';
    }
    return '';
  }

}
