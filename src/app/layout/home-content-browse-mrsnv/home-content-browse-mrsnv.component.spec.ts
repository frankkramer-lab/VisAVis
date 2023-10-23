import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentBrowseMrsnvComponent } from './home-content-browse-mrsnv.component';

describe('HomeContentFormMrsnvComponent', () => {
  let component: HomeContentBrowseMrsnvComponent;
  let fixture: ComponentFixture<HomeContentBrowseMrsnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContentBrowseMrsnvComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentBrowseMrsnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
