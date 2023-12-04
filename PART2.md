# Task Part 2: Integrating Pagination Component in Angular App

## Overview
This part of the task involves integrating the previously developed pagination component into an Angular application. The primary objectives are to create a service for API fetching and to develop a blogs overview page that updates dynamically when interacting with the pagination component.

## Objectives

### 1. Create an API Fetching Service
- **Purpose**: To fetch blog data from a specified API.
- **Requirements**:
    - Develop an Angular service (`BlogService`) for API interactions.
    - The service should handle HTTP requests to fetch blog data.
    - Implement error handling and loading states.
    - use https://www.slingacademy.com/article/sample-blog-posts-public-rest-api-for-practice/

### 2. Develop a Blogs Overview Page
- **Purpose**: To display blog posts and implement pagination.
- **Requirements**:
    - Use the Angular framework to create a `BlogsOverview` component.
    - Integrate the Lit Element pagination component into this Angular component.
    - The blog posts should be displayed in a list or grid format.
    - The pagination component should control the number of posts displayed per page.

### 3. Dynamic Interaction
- **Purpose**: To ensure the blogs overview updates when interacting with the pagination component.
- **Requirements**:
    - The `BlogsOverview` component should update the displayed blog posts based on the page selected in the pagination component.
    - Ensure smooth and responsive updates without full page reloads.


