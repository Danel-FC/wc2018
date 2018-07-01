import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quater-finals',
  templateUrl: './quater-finals.component.html',
  styleUrls: ['./quater-finals.component.css']
})
export class QuaterFinalsComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit() {
  }

}
