import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {
  @Input() color: string = '#000000';

  @Input() label: string = 'Color';

  @Input() editable!: boolean;

  highlightColorStyle() {
    const color = this.color.substring(1);

    // convert rrggbb to decimal
    const rgb = parseInt(color, 16);

    // extract red
    // eslint-disable-next-line no-bitwise
    const r = (rgb >> 16) & 0xff;
    // extract green
    // eslint-disable-next-line no-bitwise
    const g = (rgb >> 8) & 0xff;
    // extract blue
    // eslint-disable-next-line no-bitwise
    const b = (rgb >> 0) & 0xff;

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 40) {
      return `background-color:#${color};color:#ffffff;`;
    }
    return `background-color:#${color};`;
  }
}
