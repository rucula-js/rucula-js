import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormDynamicComponent } from './form-dynamic.component';

describe('FormDynamicComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FormDynamicComponent
      ],
    }).compileComponents();
  }); 
});
