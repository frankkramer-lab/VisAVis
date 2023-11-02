import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  @Input() text!: string;

  @Input() label: string | undefined;

  @Input() autoSize: boolean = false;

  @Input() tooltip!: string;

  @Input() tooltipAfterClick!: boolean;

  @Input() icon!: IconProp;

  @HostBinding('style.--tag-color-border')
  @Input()
  colorBorder!: string;

  @HostBinding('style.--tag-color-text')
  @Input()
  colorText!: string;

  @HostBinding('style.--tag-color-background')
  @Input() colorBackground!: string;

  @HostBinding('style.--tag-color-highlight')
  @Input()
  colorHighlight!: string;

  @Output() clickEmitter: EventEmitter<void> = new EventEmitter<void>();

}
