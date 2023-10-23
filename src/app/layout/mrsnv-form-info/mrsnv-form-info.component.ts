import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { MrsnvProperty } from 'src/app/data/schema/mrsnv-property';
import { MrsnvState } from 'src/app/data/state/mrsnv/mrsnv.state';

@Component({
  selector: 'app-mrsnv-form-info',
  templateUrl: './mrsnv-form-info.component.html',
  styleUrls: ['./mrsnv-form-info.component.scss'],
})
export class MrsnvFormInfoComponent {
  @Input() mrsnv!: FormGroupState<MrsnvState>;

  @Input() candidateInfo!: MrsnvProperty | null;

  @Input() candidateInfoIndex!: number | null;

  @Output() removeInfoEmitter: EventEmitter<string> = new EventEmitter<string>();
}
