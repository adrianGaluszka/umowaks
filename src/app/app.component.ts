import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { formMode } from './enums/form-modes.enum';
import { ToolbarService } from './services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'umowaks';
  hideToolbar: boolean = true;

  @ViewChild('document') document!: ElementRef<HTMLElement>;
  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    if (this.document?.nativeElement.offsetTop - 100 < window.scrollY) {
      console.log('visible');
      this.hideToolbar = false;
    } else {
      this.hideToolbar = true;
    }
  }

  @HostListener('window:scrollend', ['$event'])
  public onScrollEnd(event: Event): void {
    console.log(event);

  }

  get mode$(): Observable<formMode> {
    return this.toolbarService.getModeValue$();
  }

  constructor(private readonly toolbarService: ToolbarService) {}
}
