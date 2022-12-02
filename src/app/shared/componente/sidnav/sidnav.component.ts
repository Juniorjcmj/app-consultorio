import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent implements OnInit {

  isAdmin: boolean = false;

  constructor() {

   }

  ngOnInit(): void {
  }

}
