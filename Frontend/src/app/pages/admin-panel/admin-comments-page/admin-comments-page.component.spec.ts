import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentsPageComponent } from './admin-comments-page.component';

describe('AdminCommentsPageComponent', () => {
  let component: AdminCommentsPageComponent;
  let fixture: ComponentFixture<AdminCommentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCommentsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCommentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
