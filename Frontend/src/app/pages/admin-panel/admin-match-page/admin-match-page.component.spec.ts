import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatchPageComponent } from './admin-match-page.component';

describe('AdminMatchPageComponent', () => {
  let component: AdminMatchPageComponent;
  let fixture: ComponentFixture<AdminMatchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMatchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
