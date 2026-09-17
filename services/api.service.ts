import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';
import { UserProfile } from '../models/profile.model';
import { CVData } from '../models/cv.model';
import { Project } from '../models/project.model';

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface PublicProfileResponse {
  profile: UserProfile;
  cv: CVData;
  projects: Project[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /* ================= Auth Endpoints ================= */
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials);
  }

  register(data: { name: string; email: string; username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, data);
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/logout`, {});
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/me`);
  }

  /* ================= Profile Endpoints ================= */
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/profile`);
  }

  updateProfile(partial: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseUrl}/profile`, partial);
  }

  getPublicProfile(slug: string): Observable<PublicProfileResponse> {
    return this.http.get<PublicProfileResponse>(`${this.baseUrl}/public/profiles/${slug}`);
  }

  /* ================= CV Endpoints ================= */
  getCV(): Observable<CVData> {
    return this.http.get<CVData>(`${this.baseUrl}/cv`);
  }

  updateCV(cv: CVData): Observable<CVData> {
    return this.http.put<CVData>(`${this.baseUrl}/cv`, cv);
  }

  /* ================= Project Endpoints ================= */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`);
  }

  createProject(project: Omit<Project, 'id' | 'createdAt'>): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, project);
  }

  updateProject(id: string, partial: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/projects/${id}`, partial);
  }

  deleteProject(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/projects/${id}`);
  }
}
