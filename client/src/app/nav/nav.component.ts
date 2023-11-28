import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  loggedIn: boolean = false;


  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    // Initialization logic here
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loggedIn = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  logout()
  {
    this.accountService.logout(); // Implement the logout method in your service
    this.loggedIn = false;
    this.router.navigate(['/']); // Navigate back to the homepage
  }
}
