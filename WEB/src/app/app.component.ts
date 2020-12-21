import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/models/AppUser.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: AppUser[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.getUsers(); }

  getUsers(): void {
    this.http.get<AppUser[]>('https://localhost:5001/api/users')
      .subscribe(
        users => this.users = users,
        err => console.log(err));
  }
}
