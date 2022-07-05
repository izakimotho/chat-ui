import { Component, OnInit } from '@angular/core';
import {DatePipe } from "@angular/common";
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  currentYear: Number ;
  constructor() { }

  ngOnInit(): void {
     
    this.currentYear=new Date().getFullYear();
  }

}
