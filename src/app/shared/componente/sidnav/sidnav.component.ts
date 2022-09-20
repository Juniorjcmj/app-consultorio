import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modulos/login/login.service';

@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private service: LoginService) {
    this.isAdmin = this.service.isAdmin();
   }

  ngOnInit(): void {
  }

}
