import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCastersPageComponent } from './admin-casters-page.component';

describe('AdminCastersPageComponent', () => {
  let component: AdminCastersPageComponent;
  let fixture: ComponentFixture<AdminCastersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCastersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCastersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
