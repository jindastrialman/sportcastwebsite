import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogPageComponent } from './admin-blog-page.component';

describe('AdminBlogPageComponent', () => {
  let component: AdminBlogPageComponent;
  let fixture: ComponentFixture<AdminBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBlogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
