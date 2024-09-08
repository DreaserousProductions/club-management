import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberOperationsComponent } from './admin-member-operations.component';

describe('AdminMemberOperationsComponent', () => {
  let component: AdminMemberOperationsComponent;
  let fixture: ComponentFixture<AdminMemberOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMemberOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMemberOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
