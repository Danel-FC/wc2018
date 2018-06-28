import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-eighth',
  templateUrl: './eighth.component.html',
  styleUrls: ['./eighth.component.css']
})
export class EighthComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit() {
  }

}
