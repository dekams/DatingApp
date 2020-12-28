import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginDto } from 'src/models/LoginDto.model';
import { UserDto } from 'src/models/UserDto.model';
import { map } from 'rxjs/operators';
import { RegisterDto } from 'src/models/Register.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseURL = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<UserDto>(1);

  constructor(private http: HttpClient) { }

  get currentUser$(): Observable<UserDto> {
    return this.currentUserSource.asObservable();
  }

  login(model: LoginDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseURL}account/login`, model)
    .pipe(
      map((user: UserDto) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }

  register(model: RegisterDto): Observable<void> {
    return this.http.post<UserDto>(`${this.baseURL}account/register`, model)
    .pipe(
      map((user: UserDto) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: UserDto): void {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
