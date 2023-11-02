import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentBrowseVisualizationComponent } from './home-content-browse-visualization.component';

describe('HomeContentFormMrsnvComponent', () => {
  let component: HomeContentBrowseVisualizationComponent;
  let fixture: ComponentFixture<HomeContentBrowseVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContentBrowseVisualizationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentBrowseVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
