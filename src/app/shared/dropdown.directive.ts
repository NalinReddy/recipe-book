import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from "@angular/core";

@Directive({
    selector:'[drop]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('click') onclick(eventData: Event){
        // this.renderer.setAttribute(this.elRef.nativeElement,"class","open");
        this.isOpen = !this.isOpen;
        console.log("clicked dropdown", this.isOpen);
 }
    constructor(private elRef: ElementRef, private renderer: Renderer2){}
    
    
}