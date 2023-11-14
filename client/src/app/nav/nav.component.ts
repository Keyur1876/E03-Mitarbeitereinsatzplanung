import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  loggedIn: boolean = false;


  constructor(private accountService: AccountService) {}

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
    
  }
}
