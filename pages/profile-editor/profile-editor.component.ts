import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.scss',
})
export class ProfileEditorComponent {
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  protected readonly current = this.profileService.profile;

  protected fullName = signal('');
  protected username = signal('');
  protected title = signal('');
  protected bio = signal('');
  protected location = signal('');
  protected country = signal('');
  protected availability = signal<UserProfile['availability']>('available');
  protected visibility = signal<UserProfile['visibility']>('public');
  protected avatarColor = signal('#2f6fe4');
  protected email = signal('');
  protected phone = signal('');
  protected whatsapp = signal('');
  protected githubUrl = signal('');
  protected linkedinUrl = signal('');
  protected twitterUrl = signal('');

  protected saveSuccess = signal(false);

  protected readonly colorOptions = ['#2f6fe4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#0f172a'];

  constructor() {
    const p = this.current();
    this.fullName.set(p.fullName);
    this.username.set(p.username);
    this.title.set(p.title);
    this.bio.set(p.bio);
    this.location.set(p.location);
    this.country.set(p.country);
    this.availability.set(p.availability);
    this.visibility.set(p.visibility);
    this.avatarColor.set(p.avatarColor || '#2f6fe4');
    this.email.set(p.email);
    this.phone.set(p.phone || '');
    this.whatsapp.set(p.whatsapp || '');
    this.githubUrl.set(p.githubUrl || '');
    this.linkedinUrl.set(p.linkedinUrl || '');
    this.twitterUrl.set(p.twitterUrl || '');
  }

  protected selectColor(color: string): void {
    this.avatarColor.set(color);
  }

  protected onSubmit(): void {
    this.profileService.updateProfile({
      fullName: this.fullName(),
      username: this.username().trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      title: this.title(),
      bio: this.bio(),
      location: this.location(),
      country: this.country(),
      availability: this.availability(),
      visibility: this.visibility(),
      avatarColor: this.avatarColor(),
      email: this.email(),
      phone: this.phone(),
      whatsapp: this.whatsapp(),
      githubUrl: this.githubUrl(),
      linkedinUrl: this.linkedinUrl(),
      twitterUrl: this.twitterUrl(),
    });

    this.saveSuccess.set(true);
    setTimeout(() => this.saveSuccess.set(false), 3000);
  }
}
