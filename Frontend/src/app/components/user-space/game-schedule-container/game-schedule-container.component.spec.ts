import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScheduleContainerComponent } from './game-schedule-container.component';

describe('GameScheduleContainerComponent', () => {
  let component: GameScheduleContainerComponent;
  let fixture: ComponentFixture<GameScheduleContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScheduleContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScheduleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
