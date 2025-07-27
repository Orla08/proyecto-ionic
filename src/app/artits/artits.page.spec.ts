import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtitsPage } from './artits.page';

describe('ArtitsPage', () => {
  let component: ArtitsPage;
  let fixture: ComponentFixture<ArtitsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
