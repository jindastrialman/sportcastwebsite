import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayerPageComponent } from './game-player-page.component';

describe('GamePlayerPageComponent', () => {
  let component: GamePlayerPageComponent;
  let fixture: ComponentFixture<GamePlayerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlayerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
