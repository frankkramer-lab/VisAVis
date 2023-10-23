import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsnvPropertyComponent } from './mrsnv-property.component';

describe('MrsnvPropertyComponent', () => {
  let component: MrsnvPropertyComponent;
  let fixture: ComponentFixture<MrsnvPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MrsnvPropertyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrsnvPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
