import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableTitle } from './table-title';

describe('TableTitle', () => {
  let component: TableTitle;
  let fixture: ComponentFixture<TableTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(TableTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
