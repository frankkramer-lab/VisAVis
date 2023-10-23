import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdexSubmissionFailureComponent } from './ndex-submission-failure.component';

describe('NdexSubmissionFailureComponent', () => {
  let component: NdexSubmissionFailureComponent;
  let fixture: ComponentFixture<NdexSubmissionFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdexSubmissionFailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdexSubmissionFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
