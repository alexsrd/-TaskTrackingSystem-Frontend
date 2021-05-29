import {Component} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RegisterModel} from "../../models/register-model";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  formModel: FormGroup;
  constructor(private fb: FormBuilder,private auth:AuthService,private snackBar:SnackBarService) {
    this.formModel = this.fb.group({
      Name: ["", Validators.required],
      Surname: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required],
      ConfirmPassword:["", Validators.required]
    },{
      validators:this.matchPasswords("Password","ConfirmPassword")
    });
  }

  matchPasswords(password:string,confirmPassword:string)
  {
    return (formGroup:FormGroup)=>{
      const pass = formGroup.controls[password];
      const confirm = formGroup.controls[confirmPassword];
      if(confirm.errors && !confirm.errors.match) return;
      if(pass.value != confirm.value)
      {
        confirm.setErrors({match:true});
      }else{
        confirm.setErrors(null);
      }
    }
  }

  getNameErrorMessage(control:string):string
  {
    let password = this.formModel.controls[control];
    if(password.hasError('required')){
      return  'You must enter a value';
    }
    return '';
  }

  getEmailErrorMessage():string {
    let email = this.formModel.controls["Email"];

    if (email.hasError('required')) {
      return 'You must enter a value';
    }
    return email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage():string
  {
    let password = this.formModel.controls["Password"];
    if(password.hasError('required')){
      return  'You must enter a value';
    }
    return '';
  }

  getConfirmPasswordErrorMessage():string
  {
    let password = this.formModel.controls["ConfirmPassword"];
    if(password.hasError('required')){
      return  'Passwords do not match';
    }
    if(password.hasError('match')){
      return  'Passwords do not match';
    }
    return '';
  }

  onSubmit():void
  {
    const name = this.formModel.controls["Name"].value;
    const surname = this.formModel.controls["Surname"].value;
    const email = this.formModel.controls["Email"].value;
    const password = this.formModel.controls["Password"].value;
    this.registerUser(new RegisterModel(name,surname,email,password));
  }

  registerUser(user:RegisterModel):void
  {
    this.auth.register(user).subscribe(
      () => this.snackBar.showMessage("Registration successful")
    );
  }

}
