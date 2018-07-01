import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @Input('teams')
  teams:any[];

  @Input('title')
  title:string;

  constructor(public data:DataService) { }

  ngOnInit() {
  }

}
