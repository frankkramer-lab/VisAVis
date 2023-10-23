import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsnvPropertyListComponent } from './mrsnv-property-list.component';

describe('MrsnvPropertyListComponent', () => {
  let component: MrsnvPropertyListComponent;
  let fixture: ComponentFixture<MrsnvPropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MrsnvPropertyListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrsnvPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
