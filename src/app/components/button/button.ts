import { Component, Input, computed } from '@angular/core';
import { Icon, type IconName } from '@/app/components/icon/icon';

export type IconLocation = 'left' | 'right';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Color = 'purple' | 'black' | 'gray' | 'white';
export type Variant = 'filled' | 'outlined';

const SizeStylesMap: Record<Size, string> = {
  sm: 'px-2',
  md: 'px-3',
  lg: 'px-4',
  xl: 'px-5',
} as const;

const ColorStylesMap: Record<Color, string> = {
  purple: 'bg-purple-500 dark:bg-purple-500 text-white',
  black: 'border-black bg-black dark:bg-dark-gray text-white',
  gray: 'bg-dark-gray dark:bg-medium-gray text-white',
  white: 'bg-white dark:text-black',
};

const OutlinedColorStylesMap: Record<Color, string> = {
  purple: 'border-purple-500 text-purple-500',
  black: 'border-black text-black dark:text-white dark:border-[black] border-3',
  gray: 'border-gray-500 text-gray-500',
  white: 'border-white text-white',
} as const;

const VariantStylesMap: Record<Variant, string> = {
  filled: '',
  outlined: 'bg-transparent border-2',
} as const;

const buttonClasses = `
  py-2 px-5
  relative rounded cursor-pointer
  w-full flex items-center justify-center
  disabled:opacity-70
  disabled:cursor-not-allowed
  disabled:pointer-events-none
`;

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
      [class]="mergedClasses()"
      [style.--arrow-color]="arrowColor()"
      [attr.popovertarget]="popoverTarget"
      [attr.anchor]="anchor"
      [disabled]="disabled || isLoading"
    >
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
    '[attr.type]': 'type',
    '[attr.data-size]': 'size',
    '[attr.data-has-popover]': 'popoverTarget || anchor',
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

      :host[data-has-popover] button::after {
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
    `,
  ],
})
export class Button {
  @Input()
  type: 'button' | 'submit' = 'button';

  @Input()
  color: Color = 'purple';

  @Input()
  variant: Variant = 'filled';

  @Input()
  size: Size = 'md';

  @Input()
  iconLocation: IconLocation = 'left';

  @Input()
  icon: IconName | null = null;

  @Input({ alias: 'class' })
  className: string = '';

  @Input()
  isLoading = false;

  @Input()
  popoverTarget: string | null = null;

  @Input()
  anchor: string | null = null;

  @Input()
  anchorName: string | null = null;

  @Input()
  disabled: boolean = false;

  protected mergedClasses = computed(() => {
    const extended = this.className;
    const sizeStyles = SizeStylesMap[this.size];
    const colorStyles =
      this.variant === 'outlined' ? OutlinedColorStylesMap[this.color] : ColorStylesMap[this.color];
    const variantStyles = VariantStylesMap[this.variant];
    return `${buttonClasses} ${sizeStyles} ${colorStyles} ${variantStyles} ${extended}`.trim();
  });

  protected arrowColor = computed(() => {
    if (this.variant === 'filled') {
      return 'white';
    }
    
    const outlinedColors: Record<Color, string> = {
      purple: '#9333ea',
      black: '#000000',
      gray: '#6b7280',
      white: '#ffffff',
    };
    return outlinedColors[this.color];
  });
}
