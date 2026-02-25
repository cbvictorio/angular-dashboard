import { Component, Input, computed, HostBinding } from '@angular/core';
import { Icon, type IconName } from '@/app/components/icon/icon';

export type IconLocation = 'left' | 'right';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
const SizeStylesMap: Record<Size, string> = {
  sm: 'px-1.5',
  md: 'px-2',
  lg: 'px-3',
  xl: 'px-4',
} as const;

/* 
  The [group-data-*] attributes are added to manage the
  Angular's Primitive attributes
*/
const buttonClasses = `
  py-2
  border border-transparent rounded
  text-white cursor-pointer relative
  bg-purple-700 dark:bg-purple-500/30
  w-full flex items-center justify-center
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:pointer-events-none
`;

const iconClasses = `absolute top-0 bottom-0 my-auto`;

const loaderClasses = ` 
  h-4 w-4 
  animate-ping
  right-5 absolute
  bg-white rounded-full
  flex items-center justify-center
  [animation-duration:850ms]
`;

@Component({
  selector: 'app-button',
  imports: [Icon],
  template: `
    <button [class]="mergedClasses()" [attr.popovertarget]="popoverTarget" [attr.anchor]="anchor" [disabled]="disabled || isLoading">
      @if (iconLocation == 'left' && icon) {
        <app-icon class="${iconClasses} left-3" [name]="icon" />
      }
      <ng-content />
      @if (iconLocation == 'right' && icon) {
        <app-icon class="${iconClasses} left-3" [name]="icon" />
      }
      @if (isLoading) {
        <div class="${loaderClasses} ${iconClasses}"></div>
      }
    </button>
  `,
  host: {
    class: 'group',
    '[attr.type]': 'type',
    '[attr.data-size]': 'size',
    '[style.anchor-name]': 'anchorName',
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
  @Input() popoverTarget: string | null = null;
  @Input() anchor: string | null = null;
  @Input() anchorName: string | null = null;
  @Input() disabled: boolean = false;

  protected mergedClasses = computed(() => {
    const extended = this.className;
    const sizeStyles = SizeStylesMap[this.size];
    return `${buttonClasses} ${sizeStyles} ${extended}`.trim();
  });
}
