import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundOneComponent } from './round-one.component';

describe('RoundOneComponent', () => {
  let component: RoundOneComponent;
  let fixture: ComponentFixture<RoundOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
