import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterFinalsComponent } from './quater-finals.component';

describe('QuaterFinalsComponent', () => {
  let component: QuaterFinalsComponent;
  let fixture: ComponentFixture<QuaterFinalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuaterFinalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaterFinalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
