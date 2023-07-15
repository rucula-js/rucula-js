import { Component, OnInit } from '@angular/core';
import frame from '../../shared/component/tamplate-window/frame.json'

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  window:any 
  ngOnInit(): void {
    this.window = frame;
  }
}
