import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdexSubmissionComponent } from './ndex-submission.component';

describe('NdexSubmissionComponent', () => {
  let component: NdexSubmissionComponent;
  let fixture: ComponentFixture<NdexSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdexSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdexSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
