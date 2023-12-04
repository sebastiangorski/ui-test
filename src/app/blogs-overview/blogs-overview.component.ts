import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog-service.service';
import {BlogPost, BlogPosts} from '../models/blog-post.model';
import {Observable, Subject, concatMap, of, tap } from 'rxjs';


@Component({
  selector: 'app-blogs-overview',
  templateUrl: './blogs-overview.component.html',
  styleUrls: ['./blogs-overview.component.css']
})
export class BlogsOverviewComponent implements OnInit {

  //blogPosts: BlogPost[] = [];
  loading = true;
  loadError: boolean = false;

  pageSize = 6;

  currentPage = 1;
  pagesToShow = 3;
  totalPages = 0;

  blogPosts2$: Observable<BlogPosts> = of({} as BlogPosts);
  constructor(private blogService: BlogService) {
    // To use async pipe in HTML, but issue with the import
    this.blogPosts2$ = this.blogService.getPaginatedBlogPosts(this.currentPage, this.pageSize)
  }

  ngOnInit() {
    // this.blogPosts2.pipe(
    //   concatMap(() => {
    //     return this.blogService.getPaginatedBlogPosts(this.currentPage, this.pageSize);
    //   }),
    //   tap((posts) => {
    //     console.log(posts);
    //     this.blogPosts = posts.blogs;
    //     this.totalPages = posts.total_blogs;
    //     this.loadError = false;
    //     this.loading = false;
    //   })
    // ).subscribe()
  }

  onPaginationChange(event: Event) {
    this.currentPage = (event as CustomEvent<number>).detail;
    //this.getBlogPosts();
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  // private getBlogPosts(): void {
  //   this.blogService.getPaginatedBlogPosts(this.currentPage, this.pageSize).subscribe(
  //     {
  //       next: (posts: BlogPosts) => {
  //         console.log(posts);
  //         //this.blogPosts = posts.blogs;
  //         this.totalPages = posts.total_blogs;
  //         this.loadError = false;
  //         this.loading = false;
  //       },
  //       error: (e) => {
  //         console.log(e);
  //         this.loadError = true;
  //         this.loading = false;
  //       },
  //       complete: () => console.log('Blog posts loaded')
  //     }
  //   )
  // }

  protected readonly event = event;
}
