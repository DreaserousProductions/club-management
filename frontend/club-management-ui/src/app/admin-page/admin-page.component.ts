import { Component, AfterViewInit } from '@angular/core';
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminClubOperationsComponent } from "./admin-club-operations/admin-club-operations.component";
import { AdminMemberOperationsComponent } from "./admin-member-operations/admin-member-operations.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [AdminHomeComponent, AdminClubOperationsComponent, AdminMemberOperationsComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
}
