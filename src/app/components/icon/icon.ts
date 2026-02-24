import { Component, Input, computed } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideTrash2, lucidePlus, lucideSave } from '@ng-icons/lucide';

export type IconName = keyof typeof ICON_MAP;
export type IconLocation = 'left' | 'right';

const ICON_MAP = {
  save: 'lucideSave',
  delete: 'lucideTrash2',
  add: 'lucidePlus',
  success: 'lucideCheck',
} as const;

const ICONS_MAP_PROVIDER = {
  lucidePlus,
  lucideTrash2,
  lucideSave,
  lucideCheck,
};

@Component({
  selector: 'app-icon',
  imports: [NgIconComponent],
  standalone: true,
  providers: [provideIcons(ICONS_MAP_PROVIDER)],
  template: `<ng-icon [name]="iconMap[name]" [class]="className" />`,
})
export class Icon {
  @Input({ alias: 'class' }) className: string = '';
  @Input() name!: IconName;
  protected iconMap = ICON_MAP;
}
