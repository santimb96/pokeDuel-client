import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueGameComponent } from './continue-game.component';

describe('ContinueGameComponent', () => {
  let component: ContinueGameComponent;
  let fixture: ComponentFixture<ContinueGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
