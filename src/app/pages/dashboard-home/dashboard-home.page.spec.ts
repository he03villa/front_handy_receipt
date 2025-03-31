import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHomePage } from './dashboard-home.page';

describe('DashboardHomePage', () => {
  let component: DashboardHomePage;
  let fixture: ComponentFixture<DashboardHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
