import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  activeMenuItem: string = '';
  showPopup: boolean = false;

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('togglePassword') togglePassword!: ElementRef<HTMLSpanElement>;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
    this.accountService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  getUsers(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => this.users = response,
      error: (error) => console.error(error),
      complete: () => console.log('Request has completed')
    });
  }

  cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }

  setActive(menuItem: string): void {
    this.activeMenuItem = menuItem;
  }

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  onPopupClick(event: Event): void {
    if ((event.target as HTMLElement).id === 'news-form-popup') {
      this.closePopup();
    }
  }

  togglePasswordVisibility(): void {
    const input = this.passwordInput.nativeElement;
    const toggle = this.togglePassword.nativeElement;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggle.innerText = isPassword ? 'visibility' : 'visibility_off';
  }

  onLoginFormSubmit(event: Event): void {
    event.preventDefault();
    // Hier würde Ihre Logik zum Überprüfen der Anmeldeinformationen stehen
    // und ggf. die Authentifizierung über den AccountService ausführen.
  }
}
