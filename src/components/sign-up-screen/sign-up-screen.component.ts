import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.scss'],
})
export class SignUpScreenComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {}

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
  userName = new FormGroup({
    primaryName : new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    SignUpScreenComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
  ])
})


  userEmail = new FormGroup({
    primaryEmail: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });

    userPassword = new FormGroup({
      primaryPassword : new FormControl('', [
        Validators.required,
        // 2. check whether the entered password has a number
        SignUpScreenComponent.patternValidator(/(?=.*?[0-9])/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        SignUpScreenComponent.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        SignUpScreenComponent.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        SignUpScreenComponent.patternValidator(/(?=.*?[!@#\$&*~])/, {hasSpecialCharacter: true}),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)
      ])
     })

     get primName(){
      return this.userName.get('primaryName')
    }
    get primEmail(){
        return this.userEmail.get('primaryEmail')
      }
      get primPassword(){
        return this.userPassword.get('primaryPassword')
      }

}
