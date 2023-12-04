import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {BlogPosts } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://api.slingacademy.com/v1/sample-data';

  constructor(private http: HttpClient) { }

  getPaginatedBlogPosts(page: number, pageSize: number): Observable<BlogPosts> {
    const offset = page > 1 ? page * pageSize : 0; // Offset - get post, starting from the nth post
    return this.http.get<BlogPosts>(`${this.apiUrl}/blog-posts?offset=${offset}&limit=${pageSize}`);
  }
}
