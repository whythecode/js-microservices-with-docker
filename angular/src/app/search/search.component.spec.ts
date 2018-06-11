import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockEnvironmentService } from '../shared/search/mocks/environment.service';
import { SearchComponent } from './search.component';
import { MockSearchService } from '../shared/search/mocks/search.service';
import { MockActivatedRoute, MockRouter } from '../shared/search/mocks/routes';
import { EnvironmentService, SearchService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchService: MockSearchService;
  let mockEnvironmentService: MockEnvironmentService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockSearchService = new MockSearchService();
    mockEnvironmentService = new MockEnvironmentService();
    mockActivatedRoute = new MockActivatedRoute({'term': 'peyton'});
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        {provide: SearchService, useValue: mockSearchService},
        {provide: EnvironmentService, useValue: mockEnvironmentService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [FormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search when a term is set and search() is called', () => {
    component = fixture.debugElement.componentInstance;
    component.query = 'M';
    component.search();
    expect(mockSearchService.searchSpy).toHaveBeenCalledWith('M');
  });

  it('should search automatically when a term is on the URL', () => {
    fixture.detectChanges();
    expect(mockSearchService.searchSpy).toHaveBeenCalledWith('peyton');
  });
});
