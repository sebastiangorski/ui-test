import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BlogsOverviewComponent } from './blogs-overview.component';
import { BlogService } from '../services/blog-service.service';
import { of } from 'rxjs';
import { BlogPosts } from '../models/blog-post.model';

describe('BlogsOverviewComponent', () => {
  let component: BlogsOverviewComponent;
  let fixture: ComponentFixture<BlogsOverviewComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BlogService', ['getPaginatedBlogPosts']);

    TestBed.configureTestingModule({
      declarations: [BlogsOverviewComponent],
      providers: [{ provide: BlogService, useValue: spy }],
    });

    fixture = TestBed.createComponent(BlogsOverviewComponent);
    component = fixture.componentInstance;
    blogServiceSpy = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get blog posts on initialization', fakeAsync(() => {
    const mockBlogPosts: BlogPosts = {
      blogs: [{ id: '1', title: 'Blog 1', description: 'Test description', photo_url: 'test-url' }],
      total_blogs: 1,
    };

    blogServiceSpy.getPaginatedBlogPosts.and.returnValue(of(mockBlogPosts));

    fixture.detectChanges();
    tick();

    expect(component.blogPosts).toEqual(mockBlogPosts.blogs);
    expect(component.totalPages).toEqual(0); // Assuming total_blogs is 1 and pageSize is 6
    expect(component.loading).toBeFalsy();
    expect(component.loadError).toBeFalsy();
  }));

  it('should handle pagination change', fakeAsync(() => {
    const mockBlogPosts: BlogPosts = {
      blogs: [{ id: '1', title: 'Blog 1', description: 'Test description', photo_url: 'test-url' }],
      total_blogs: 1,
    };

    blogServiceSpy.getPaginatedBlogPosts.and.returnValue(of(mockBlogPosts));

    fixture.detectChanges();
    tick();

    expect(component.blogPosts).toEqual(mockBlogPosts.blogs);

    const event = new CustomEvent<number>('pagination-change', { detail: 2 });
    component.onPaginationChange(event);

    tick();

    expect(blogServiceSpy.getPaginatedBlogPosts).toHaveBeenCalledWith(2, component.pageSize);
  }));
});
