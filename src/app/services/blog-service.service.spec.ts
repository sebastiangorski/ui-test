import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService } from './blog-service.service';
import { BlogPosts } from '../models/blog-post.model';

describe('BlogServiceService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://api.slingacademy.com/v1/sample-data';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });

    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch paginated blog posts', inject(
    [BlogService],
    (blogService: BlogService) => {
      const page = 1;
      const pageSize = 5;

      const mockBlogPosts: BlogPosts = {
        blogs: [
          {
            id: '1',
            title: 'Test title',
            description: 'Test description',
            photo_url: 'test-url'
          },
          {
            id: '2',
            title: 'Test title 2',
            description: 'Test description 2',
            photo_url: 'test-url-2'
          }
        ],
        total_blogs: 2,
      };

      blogService.getPaginatedBlogPosts(page, pageSize).subscribe((response) => {
        expect(response).toEqual(mockBlogPosts);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/blog-posts?offset=0&limit=${pageSize}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBlogPosts);
    }
  ));
});
