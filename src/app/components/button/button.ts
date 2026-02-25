import { Component, input, computed } from '@angular/core';
import { Icon, type IconName } from '@/app/components/icon/icon';

export type IconLocation = 'left' | 'right';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Color = 'purple' | 'black' | 'gray' | 'white';
export type Variant = 'filled' | 'outlined';

const loaderClasses = ` 
  h-4 w-4
  animate-ping
  right-5 absolute
  bg-white rounded-full
  flex items-center justify-center
  [animation-duration:850ms]
`;

const iconClasses = `absolute top-0 bottom-0 my-auto`;

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [Icon],
  template: `
    <button
      [attr.popovertarget]="popoverTarget()"
      [attr.anchor]="anchor()"
      [disabled]="disabled() || isLoading()"
    >
      @if (iconLocation() == 'left' && icon()) {
        <app-icon class="${iconClasses} left-1" [name]="icon()!" />
      }
      <span> <ng-content /> </span>
      @if (iconLocation() == 'right' && icon()) {
        <app-icon class="${iconClasses} right-1" [name]="icon()!" />
      }
      @if (isLoading()) {
        <div class="${loaderClasses} ${iconClasses}"></div>
      }
    </button>
  `,
  host: {
    '[attr.type]': 'type()',
    '[attr.data-size]': 'size()',
    '[attr.data-color]': 'color()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-has-popover]': 'popoverTarget() || anchor()',
    '[attr.data-has-icon]': 'icon()',
    '[attr.class]': 'className()',
  },
  styles: [
    `
      @reference "../../../styles.css";

      /* Base styles on <button> tag */
      button {
        @apply 
          w-full py-2 text-sm shadow-md
          block relative cursor-pointer 
          flex items-center justify-center 
          disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none
          transition-all active:scale-95 active:shadow-inner hover:shadow-lg
        ;
      }

      /* Sizes */
      :host[data-size='sm'] button {
        @apply py-1.5 text-xs px-2;
      }
      
      :host[data-size='md'] button,:host(:not([data-size])) {
        @apply text-sm px-3;
      }

      :host[data-size='lg'] button {
        @apply py-2.5 text-base px-5;
      }

      :host([data-size='xl']) button {
        @apply py-3 text-lg px-7;
      }

      /* Colors */
      :host([data-color='purple']),:host(:not([data-color])) {
        @apply bg-purple-500 dark:bg-purple-500 text-white border-purple-500;
      }
      
      :host([data-color='black']) {
        @apply border-black bg-dark-gray dark:bg-black text-white border-black;
      }
      
      :host([data-color='gray']) {
        @apply bg-medium-gray dark:bg-medium-gray text-light-gray border-medium-gray;
      }
      
      :host([data-color='white']) {
        @apply bg-white dark:text-black;
      }
      
      /* outlined variant */
      :host([data-variant='outlined']) {
        @apply bg-transparent border-2 text-inherit border-3 font-bold;
      }
      
      :host([data-variant='outlined']:is([data-color='purple'], :not([data-color]))) {
        --arrow-color: #9333ea;
      }
      
      :host([data-variant='outlined'][data-color='black']) {
        --arrow-color: #000000;
      }
      
      :host([data-variant='outlined'][data-color='gray']) {
        --arrow-color: #6b7280;
      }
      
      :host([data-variant='outlined'][data-color='white']) {
        --arrow-color: #ffffff;
      }

      /* Icon conditional styles */
      :host([icon]) button  {
        span {
          @apply px-3;
        }
      }

      /* Anchor menu styles */
      :host[data-has-popover] button {
        padding-right: 30px;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: calc(100% - 20px);
          margin-block: auto;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid var(--arrow-color, currentColor);
        }
        }
    `,
  ],
})
export class Button {
  readonly className = input<string>('');
  readonly type = input<'button' | 'submit'>('button');
  readonly color = input<Color>('purple');
  readonly variant = input<Variant>('filled');
  readonly size = input<Size>('md');
  readonly iconLocation = input<IconLocation>('left');
  readonly icon = input<IconName | null>(null);
  readonly isLoading = input(false);
  readonly popoverTarget = input<string | null>(null);
  readonly anchor = input<string | null>(null);
  readonly anchorName = input<string | null>(null);
  readonly disabled = input(false);
}
