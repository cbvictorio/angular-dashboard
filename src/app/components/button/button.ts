import { NgpButton } from 'ng-primitives/button';
import { Component, Input, computed, inject } from '@angular/core';
import { Icon, type IconName } from '@/app/components/icon/icon';

export type IconLocation = 'left' | 'right';
export type Size = 'sm' | 'md' | 'lg' | 'xl';

/* 
  The [group-data-*] attributes are added to manage the
  Angular's Primitive attributes
*/

const buttonClasses = `
  py-2
  disabled:opacity-50
  border border-transparent rounded
  text-white cursor-pointer relative
  bg-purple-700 dark:bg-purple-500/30
  w-full flex items-center justify-center
  disabled:cursor-not-allowed
  disabled:pointer-events-none
  group-data-[disabled]:opacity-50
  group-data-[disabled]:cursor-not-allowed
  group-data-[disabled]:pointer-events-none
`;

const iconClasses = `absolute top-0 bottom-0 my-auto`;

const loaderClasses = ` 
  h-4 w-4 
  animate-ping
  right-5 absolute
  bg-white rounded-full
  flex items-center justify-center
  [animation-duration:850ms]
`


@Component({
  selector: 'app-button',
  imports: [Icon],
  template: `
    <button [class]="mergedClasses()">
      @if (iconLocation == 'left' && icon) {
        <app-icon class="${iconClasses} left-3" [name]="icon" />
      }
      <ng-content />
      @if (iconLocation == 'right' && icon) {
        <app-icon class="${iconClasses} left-3" [name]="icon" />
      }
      @if (isLoading) {
        <div
          class="${loaderClasses} ${iconClasses}"
        ></div>
      }
    </button>
  `,
  hostDirectives: [
    {
      directive: NgpButton,
      inputs: ['disabled'],
    },
  ],
  host: {
    class: 'group',
    '[attr.type]': 'type',
    '[attr.data-size]': 'size',
  },
  styles: [
    `
      :host[data-size='sm'] {
        font-size: 0.875rem;
        --ng-icon__size: 0.875rem;
      }
      :host[data-size='md'],
      :host:not([data-size]) {
        font-size: 1.05rem;
        --ng-icon__size: 1.05rem;
      }
      :host[data-size='lg'] {
        min-height: 3rem;
        font-size: 1.25rem;
        --ng-icon__size: 1.1rem;
      }
      :host[data-size='xl'] {
        min-height: 3.125rem;
        font-size: 1.5rem;
        --ng-icon__size: 1.2rem;
      }
    `,
  ],
})
export class Button {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() size: Size = 'md';
  @Input() iconLocation: IconLocation = 'left';
  @Input() icon: IconName | null = null;
  @Input({ alias: 'class' }) className: string = '';
  @Input() isLoading = false;

  protected mergedClasses = computed(() => {
    const extended = this.className;
    return `${buttonClasses} ${extended}`.trim();
  });
}
