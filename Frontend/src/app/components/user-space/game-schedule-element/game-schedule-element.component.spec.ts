import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScheduleElementComponent } from './game-schedule-element.component';

describe('GameScheduleElementComponent', () => {
  let component: GameScheduleElementComponent;
  let fixture: ComponentFixture<GameScheduleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScheduleElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScheduleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
