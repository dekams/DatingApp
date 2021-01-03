import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDto } from 'src/models/LoginDto.model';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: LoginDto = { username: '', password: 'Dek@Heaven1!'};

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {}

  login(): void {
    this.accountService.login(this.model)
      .subscribe((userDto) => {
        this.router.navigateByUrl('/members');
        this.toastr.success('Logged In', 'Login');
      }, (error) => {
        console.log(error);
      });
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
