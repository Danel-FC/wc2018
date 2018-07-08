import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-semi-final',
  templateUrl: './semi-final.component.html',
  styleUrls: ['./semi-final.component.css']
})
export class SemiFinalComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit() {
  }

}
