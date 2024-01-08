// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title = 'Mitarbeiter_List';
  users: any;
  registerMode=false;
  constructor(private accountService: AccountService, private http : HttpClient) {}

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
    cancelRegisterMode(event: boolean){
      this.registerMode = event;
    }
  }

