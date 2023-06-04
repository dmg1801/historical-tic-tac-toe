import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalObjectComponent } from './cultural-object.component';

describe('CulturalObjectComponent', () => {
  let component: CulturalObjectComponent;
  let fixture: ComponentFixture<CulturalObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CulturalObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
