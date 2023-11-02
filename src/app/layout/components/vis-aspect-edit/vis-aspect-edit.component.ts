import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { MrsnvCandidate } from 'src/app/data/schema/mrsnv-candidate';
import { AspectState } from '../../../states/aspect/aspect.state';
import { MrsnvCandidateProperty } from '../../../data/schema/mrsnv-candidate-property';
import { MappingStepIndex } from '../../../data/schema/mapping-step-index';
import { NdexState } from '../../../states/ndex/ndex.state';
import { NetworkSearchItem } from '../../../data/schema/network-search-item';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-vis-aspect-edit',
  templateUrl: './vis-aspect-edit.component.html',
  styleUrls: ['./vis-aspect-edit.component.scss'],
})
export class VisAspectEditComponent {
  @Input() isUserOnline!: boolean | null;

  @Input() ndex!: FormGroupState<NdexState> | null;

  @Input() mrsnv!: FormGroupState<AspectState> | null;

  @Input() candidatesSubnetworks!: MrsnvCandidate[] | null;

  @Input() candidatesGroups!: MrsnvCandidate[] | null;

  @Input() candidatesInfos!: MrsnvCandidate[] | null;

  @Input() candidatesPropertiesGeneral!: MrsnvCandidateProperty[] | null;

  @Input() candidateGeneral!: MrsnvCandidateProperty | null;

  @Input() candidatesPropertiesIndividual!: MrsnvCandidateProperty[] | null;

  @Input() candidateIndividual!: MrsnvCandidateProperty | null;

  @Output() removeInfoEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output() addInfoEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output() setDefaultSeparatorEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() setCustomSeparator: EventEmitter<void> = new EventEmitter<void>();

  @Output() enableSeparator: EventEmitter<void> = new EventEmitter<void>();

  @Output() resetSeparator: EventEmitter<void> = new EventEmitter<void>();

  @Output() submitSeparator: EventEmitter<void> = new EventEmitter<void>();

  @Output() selectCandidateGeneral: EventEmitter<MrsnvCandidateProperty> =
    new EventEmitter<MrsnvCandidateProperty>();

  @Output() selectCandidateIndividual: EventEmitter<MrsnvCandidateProperty> =
    new EventEmitter<MrsnvCandidateProperty>();

  @Output() addPropertyGeneral: EventEmitter<void> = new EventEmitter<void>();

  @Output() addPropertyIndividual: EventEmitter<void> = new EventEmitter<void>();

  @Output() addGeneralMappingStepEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() removeGeneralMappingStepEmitter: EventEmitter<MappingStepIndex> =
    new EventEmitter<MappingStepIndex>();

  @Output() addIndividualMappingStepEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() removeIndividualMappingStepEmitter: EventEmitter<MappingStepIndex> =
    new EventEmitter<MappingStepIndex>();

  @Output() showGeneralPropertyDetailsEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() showIndividualPropertyDetailsEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() removeGeneralPropertyEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() removeIndividualPropertyEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() ndexSearchEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output() networkSelectedEmitter: EventEmitter<NetworkSearchItem> = new EventEmitter<NetworkSearchItem>();

  @Output() checkNetworkRightsEmitter: EventEmitter<NetworkSearchItem> = new EventEmitter<NetworkSearchItem>();

  @Output() copyUuidEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output() submitToNdexEmitter: EventEmitter<void> = new EventEmitter<void>();

  handleAddInfo(event: Event) {
    if (event.target) {
      const input = event.target as HTMLInputElement;
      if (input.value !== '') {
        this.addInfoEmitter.emit(input.value);
      }
    }
  }

  highlightColorStyle() {
    const color =
      this.mrsnv?.value.highlight === undefined
        ? '000000'
        : this.mrsnv?.value.highlight.substring(1);

    // convert rrggbb to decimal
    const rgb = parseInt(color, 16);
    // eslint-disable-next-line no-bitwise
    const r = (rgb >> 16) & 0xff;  // extract red
    // eslint-disable-next-line no-bitwise
    const g = (rgb >> 8) & 0xff;  // extract green
    // eslint-disable-next-line no-bitwise
    const b = (rgb >> 0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 40) {
      return `background-color:#${color};color:#ffffff;`;
    }
    return `background-color:#${color};`;
  }

  protected readonly UtilService = UtilService;
}
