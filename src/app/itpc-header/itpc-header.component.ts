import { Component, OnInit } from '@angular/core';
import { timer} from 'rxjs';

@Component({
  selector: 'app-itpc-header',
  templateUrl: './itpc-header.component.html',
  styleUrls: ['./itpc-header.component.css']
})
export class ItpcHeaderComponent implements OnInit {
  todayDate : any;
  constructor() { }

  ngOnInit(): void {
    timer(0,100).subscribe(()=>{
      this.todayDate = new Date();
    })
  }

}
