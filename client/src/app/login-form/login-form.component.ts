import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
registerMode = false;
users : any;

constructor(private accountService: AccountService, private router: Router, private http: HttpClient) {}


ngOnInit(): void {
   this.getUsers();
}

registerToggle() {
this.registerMode= !this.registerMode;
}


getUsers() {
  this.http.get('https://localhost:5001/api/users').subscribe({
    next: response => this.users = response,
    error : error => console.log(error),
    complete: () => console.log('Request has completed') 
  })

}

  model: any  = {};
  loggedIn = false;


  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.loggedIn = true;
        this.router.navigate(['/home']); // Navigate to home component
      },
      error: error => console.log(error)
    })
  }
  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}
