import { Component, OnInit } from '@angular/core';
import frame from './frame.json'

@Component({
  template: `<rucula [window]=(window)></rucula>`,
})
export class FrameComponent implements OnInit {
  window:any 
  ngOnInit(): void {
    this.window = frame;
  }
}
