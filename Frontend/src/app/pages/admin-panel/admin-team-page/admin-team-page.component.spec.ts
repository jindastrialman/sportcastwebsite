import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamPageComponent } from './admin-team-page.component';

describe('AdminTeamPageComponent', () => {
  let component: AdminTeamPageComponent;
  let fixture: ComponentFixture<AdminTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTeamPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
