import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/models/LoginDto.model';
import { UserDto } from 'src/models/UserDto.model';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: LoginDto = { username: 'dekams', password: 'Dek@Heaven1!'};

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {}

  login(): void {
    this.accountService.login(this.model)
      .subscribe((userDto) => {
        console.log(userDto);
        this.model.username = userDto.username;
      }, (error) => console.log(error));
  }

  logout(): void {
    this.accountService.logout();
  }

}
