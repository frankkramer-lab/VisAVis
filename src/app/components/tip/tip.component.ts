import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],
})
export class TipComponent {
  @Input() tipText!: string | TemplateRef<any>;

  @Input() delay: number = 0;

  @Input() placement: string = 'bottom';

  @Input() padding: string = '';
}
