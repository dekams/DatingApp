import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';
import { UserDto } from 'src/models/UserDto.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: UserDto = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
