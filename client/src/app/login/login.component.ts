import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:any = ""
  password:any = ""

  constructor(
    private _ngZone: NgZone, private _router: Router
  ) {
    // Called first time before the ngOnInit()
  }

  ngOnInit() {
    // Called after the constructor and called  after the first ngOnChanges() 
  }

  login(usernameInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    usernameInput.value;
    passwordInput.value;

    // Check if both username and password are provided
    if (usernameInput && passwordInput) {

      console.log("helloooooo");

      this._ngZone.run(() => {
        console.log("helloooooo2222");

        this._router.navigate(['/parent']);
      });
    } else {
      // Display an error message or perform any other desired action
      console.log('Please provide both username and password.');
    }
  }
}
