import { Component, Input } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      .outlined-btn {
        border: 3px solid red;
      }
    `,
  ],
  host: {
    class: 'bg-purple-700 dark:bg-purple-500/30 text-white rounded cursor-pointer py-1.5 px-4 border border-transparent',
    '[attr.type]': 'type',
  },
})
export class Button {
  @Input() type: 'button' | 'submit' = 'button';
}
