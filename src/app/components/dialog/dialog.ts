import { Component, Input, booleanAttribute } from '@angular/core';

type DialogStatus = "open" | "closed"

@Component({
  selector: 'app-dialog',
  imports: [],
  styleUrl: './dialog.css',
  template: `
    <dialog class="bg-black/80 top-0 left-0 w-full h-full flex flex-col items-center justify-center" [id]="id">
      <h3> {{title}} </h3>
      <p> {{text}} </p>
      <button commandfor="my" command="close">Close</button>
    </dialog>
  `,
})
export class Dialog {
  @Input({ required: true }) id!: string;
  @Input() title: string = 'Default Dialog Title!!';
  @Input() text: string = 'Press ESC key or click the button below to close';
  @Input({ transform: booleanAttribute }) isOpen: boolean = false;

  showModal() {
    alert('clicked!');
  }
}
