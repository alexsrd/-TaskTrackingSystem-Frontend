import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {LoginModel} from "../../models/login-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formModel: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: SnackBarService,
    private router: Router) {
    this.formModel = this.fb.group({
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required]
    });
  }

  getEmailErrorMessage(): string {
    let email = this.formModel.controls["Email"];

    if (email.hasError('required')) {
      return 'You must enter a value';
    }
    return email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    let password = this.formModel.controls["Password"];
    if (password.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onSubmit(): void {
    const email = this.formModel.controls["Email"].value;
    const password = this.formModel.controls["Password"].value;
    this.login(new LoginModel(email, password));
  }

  login(user: LoginModel): void {
    this.auth.login(user).subscribe(
      data => {
        localStorage.setItem("token", data.resultToken);
        this.snackBar.showMessage("Login successful");
        this.router.navigateByUrl('/home');
      }
    );
  }
}
