// src/app/home/home.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  isLoggedIn = false;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getUsers();
    this.accountService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  activeMenuItem: string = '';

  setActive(menuItem: string): void {
    this.activeMenuItem = menuItem;
  }

  showPopup: boolean = false;

  // Funktion zum Öffnen des Popups
  openPopup(): void {
    this.showPopup = true;
  }

  // Funktion zum Schließen des Popups
  closePopup(): void {
    this.showPopup = false;
  }

  // Funktion zum Schließen des Popups bei Klick außerhalb
  onPopupClick(event: Event): void {
    if ((event.target as HTMLElement).id === 'news-form-popup') {
      this.closePopup();
    }
  }
}