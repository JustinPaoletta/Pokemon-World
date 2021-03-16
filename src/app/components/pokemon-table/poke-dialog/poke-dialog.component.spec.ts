import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDialogComponent } from './poke-dialog.component';

describe('PokeDialogComponent', () => {
  let component: PokeDialogComponent;
  let fixture: ComponentFixture<PokeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
