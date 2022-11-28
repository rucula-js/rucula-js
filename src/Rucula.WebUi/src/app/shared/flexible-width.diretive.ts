import { Directive, ElementRef, HostListener, Input,  OnInit } from '@angular/core';


@Directive({
  selector: '[FlexibleWidth]'
})
export class FlexibleWidthDirective  implements OnInit{

  constructor(private el: ElementRef) {}
  @Input() FlexibleWidth = '';
  ngOnInit(){
    this.el.nativeElement.style.width =`${Number(this.FlexibleWidth)*7.5}px`;
  }
}