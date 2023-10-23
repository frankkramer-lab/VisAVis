import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() placeholder!: string;

  @Input() disabled!: boolean;

  @Output() clickEmitter: EventEmitter<string> = new EventEmitter<string>();

  searchTerm: string = '';

}
