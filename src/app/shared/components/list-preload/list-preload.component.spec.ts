import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreloadComponent } from './list-preload.component';

describe('ListPreloadComponent', () => {
  let component: ListPreloadComponent;
  let fixture: ComponentFixture<ListPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPreloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
