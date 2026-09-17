import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly isMenuOpen = signal(false);
  protected readonly shareCopied = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected async copyLink(): Promise<void> {
    const link = 'shadowkite.com/@jean-mukendi';

    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Keep the interaction useful in browsers without clipboard permissions.
    }

    this.shareCopied.set(true);
    window.setTimeout(() => this.shareCopied.set(false), 2200);
  }
}