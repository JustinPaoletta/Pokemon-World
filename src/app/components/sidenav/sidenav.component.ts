import { Component, Input, OnInit } from '@angular/core';

/** @title Sidenav open & close behavior */
@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @Input() pulse: boolean; 
  hide: boolean = false;
  
  ngOnInit(): void {

  }

  toggleContent(): void {
    this.hide = !this.hide;
  }

}