import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOperationPanelComponent } from './admin-operation-panel.component';

describe('AdminOperationPanelComponent', () => {
  let component: AdminOperationPanelComponent;
  let fixture: ComponentFixture<AdminOperationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOperationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOperationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
