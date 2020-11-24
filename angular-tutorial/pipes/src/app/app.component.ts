import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name:string = 'Captain America';
  PI: number = Math.PI;
  percentage: number= 0.234;
  salary: number= 1234.5;
  date: Date = new Date();
}
