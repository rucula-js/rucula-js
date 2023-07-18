import { Component, OnInit } from '@angular/core';
import frame from './frame.json'

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
})
export class FrameComponent implements OnInit {
  window:any 
  ngOnInit(): void {
    this.window = frame;
  }
}
