import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { MrsnvProperty } from 'src/app/data/schema/mrsnv-property';
import { AspectState } from 'src/app/states/aspect/aspect.state';

@Component({
  selector: 'app-vis-aspect-edit-info',
  templateUrl: './vis-aspect-info.component.html',
  styleUrls: ['./vis-aspect-info.component.scss'],
})
export class VisAspectInfoComponent {
  @Input() mrsnv!: FormGroupState<AspectState>;

  @Input() candidateInfo!: MrsnvProperty | null;

  @Input() candidateInfoIndex!: number | null;

  @Output() removeInfoEmitter: EventEmitter<string> = new EventEmitter<string>();
}
