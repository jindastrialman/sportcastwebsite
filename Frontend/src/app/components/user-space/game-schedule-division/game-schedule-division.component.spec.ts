import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScheduleDivisionComponent } from './game-schedule-division.component';

describe('GameScheduleDivisionComponent', () => {
  let component: GameScheduleDivisionComponent;
  let fixture: ComponentFixture<GameScheduleDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScheduleDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScheduleDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
