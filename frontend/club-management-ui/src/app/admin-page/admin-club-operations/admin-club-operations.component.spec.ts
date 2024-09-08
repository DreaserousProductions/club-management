import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClubOperationsComponent } from './admin-club-operations.component';

describe('AdminClubOperationsComponent', () => {
  let component: AdminClubOperationsComponent;
  let fixture: ComponentFixture<AdminClubOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClubOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClubOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
