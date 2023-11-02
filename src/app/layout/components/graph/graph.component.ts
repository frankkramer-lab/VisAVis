import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { GraphService } from '../../../services/graph.service';
import { ComponentVisibilityEnum } from '../../../data/enum/component-visibility.enum';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {
  /**
   * Cytoscape container used for rendering the network
   */
  @ViewChild('cy') cyContainer!: ElementRef;

  windowHeight: number = window.innerHeight;

  @Input() headline!: string | null;

  @Input() sidebarVisible!: ComponentVisibilityEnum | null;

  constructor(private graphService: GraphService) {}

  @HostListener('window:resize') onResize() {
    if (this.cyContainer) {
      this.windowHeight = window.innerHeight;
    }
  }

  ngAfterViewInit(): void {
    this.graphService.cyContainer = this.cyContainer.nativeElement;
  }
}
