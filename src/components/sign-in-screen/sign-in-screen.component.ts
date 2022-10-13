import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AbstractControl, FormControl, FormGroup, PatternValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ForgotPasswordComponent } from './forgot-password.component';

@Component({
  selector: 'app-sign-in-screen',
  templateUrl: './sign-in-screen.component.html',
  styleUrls: ['./sign-in-screen.component.scss'],
})
export class SignInScreenComponent implements OnInit {

  modalRef: MdbModalRef<ForgotPasswordComponent> | null = null;

  constructor(
    public authenticationService: AuthenticationService,
    private modalService: MdbModalService
    ) {}

  ngOnInit(): void {}

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
  
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
  
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  userEmail = new FormGroup({
    primaryEmail: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });

    userPassword = new FormGroup({
      primaryPassword : new FormControl('', [
        Validators.required,
        // 2. check whether the entered password has a number
        SignInScreenComponent.patternValidator(/(?=.*?[0-9])/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        SignInScreenComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        SignInScreenComponent.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        SignInScreenComponent.patternValidator(/(?=.*?[!@#\$&*~])/, {hasSpecialCharacter: true}),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)
      ])
     })

    get primEmail(){
        return this.userEmail.get('primaryEmail')
      }
      get primPassword(){
        return this.userPassword.get('primaryPassword')
      }

  openModal(email: string) {
    this.modalRef = this.modalService.open(ForgotPasswordComponent, {
      modalClass: 'modal-dialog-centered',
      data: { title: 'Custom title', email: `${email}` }, 
      backdrop: true,
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}


