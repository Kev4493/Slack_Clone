import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShowProfile]'
})
export class ShowProfileDirective {
  @Input() appShowProfile: any;

  constructor(private element: ElementRef) { 
    console.log(this.element);
  }

  @HostListener('mouseover')
  onMouseOver(){
    console.log(this.appShowProfile);
    const profileTest = `<div id="${this.appShowProfile.userEmail}">${this.appShowProfile.email}</div>`;
    (this.element.nativeElement as HTMLElement).insertAdjacentHTML('afterbegin', profileTest)
  }

  @HostListener('mouseout')
  onMouseOut(){
    document.getElementById(this.appShowProfile.userEmail).remove();
  }

}
