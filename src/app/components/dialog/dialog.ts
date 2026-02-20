import { Button } from '@/app/components/button/button';
import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

const Styles = {
  body: `
    min-w-100
    rounded
    bg-light-gray dark:bg-dark-gray 
  `,
  footer: `
    mt-2 py-3 px-7 
    bg-medium-gray/30 dark:bg-medium-gray/10
    text-right
  `
};

@Component({
  selector: 'app-dialog',
  imports: [Button],
  styleUrl: './dialog.css',
  template: `
    <dialog #appModal class="app-modal bg-black/90">
      <form method="dialog" class="${Styles.body}">
        <section class="p-7">
          @if (title) {
            <header>
              <h3 class="text-2xl/7 font-bold sm:truncate sm:text-3xl">{{ title }}</h3>
            </header>
          }
          @if (text) {
            <p class="text-shadow-md my-3">{{ text }}</p>
          }
          <ng-content></ng-content>
        </section>
        <footer class="${Styles.footer}">
          <button class="outlined mr-2" app-button type="submit"> Cancel </button>
          <button app-button> Accept </button>
        </footer>
      </form>
    </dialog>
  `,
})
export class Dialog implements AfterViewInit {

  @Input() title: string = '';
  @Input() text: string = '';
  @Input() isOpened: boolean = false;
  
  @ViewChild('appModal') appModal!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.appModal.nativeElement.showModal()
  }

  ngAfterViewInit() {
    if (this.isOpened) {
      this.appModal.nativeElement.showModal()
    }
  }
}
