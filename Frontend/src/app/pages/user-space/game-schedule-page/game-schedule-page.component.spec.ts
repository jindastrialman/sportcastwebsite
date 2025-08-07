import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSchedulePageComponent } from './game-schedule-page.component';

describe('GameSchedulePageComponent', () => {
  let component: GameSchedulePageComponent;
  let fixture: ComponentFixture<GameSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSchedulePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
