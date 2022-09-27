import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";

@Component({
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./sign-in-screen.component.scss'],
  })
  
export class ForgotPasswordComponent implements OnInit{
    constructor(public authenticationService: AuthenticationService) {}
    ngOnInit(): void {}

    userEmail = new FormGroup({
        primaryEmail: new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
        })

        get primEmail(){
            return this.userEmail.get('primaryEmail')
          }

    forgotPasswordResetEmail(email: string) {
        this.authenticationService.forgotPasswordReset(email);
    }
}