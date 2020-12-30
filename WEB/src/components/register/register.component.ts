import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/models/AppUser.model';
import { LoginDto } from 'src/models/LoginDto.model';
import { RegisterDto } from 'src/models/Register.model';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterDto = { username: '', password: ''};
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {}

  register(): void {
    this.accountService.register(this.model)
      .subscribe(
        _ => {
          this.cancel();
          // this.accountService.login(this.model as LoginDto)
          // .subscribe(user => console.log(user));
        },
        (error) => {
          console.log(error);
          this.toastr.error(error.error);
        });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }

}
