import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTwoComponent } from './round-two.component';

describe('RoundTwoComponent', () => {
  let component: RoundTwoComponent;
  let fixture: ComponentFixture<RoundTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
