import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../modulos/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 nome: any = '';
 isLogado: any;

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private service: LoginService,
              private router: Router,
             ) {
                this.nome = this.service.getNome();

                this.isLogado = this.service.isLoggedIn();
               }

  ngOnInit(): void {


  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }
  logout(){
    this.service.logout();
    window.location.reload();

  }
}
