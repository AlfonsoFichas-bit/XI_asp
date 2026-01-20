import { Component, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-live-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './live-editor.component.html',
})
export class LiveEditorComponent {
  message = signal('RUMBO A LA ALCALDÍA');

  @ViewChild('posterContainer') posterContainer!: ElementRef<HTMLDivElement>;

  characterCount = computed(() => this.message().length);
  maxCharacters = 40;

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > this.maxCharacters) {
      this.message.set(input.value.slice(0, this.maxCharacters));
      input.value = this.message(); // Force update input view
    } else {
      this.message.set(input.value);
    }
  }

  reset() {
    this.message.set('RUMBO A LA ALCALDÍA');
  }

  async saveImage() {
    // Basic implementation using Canvas API to composite text over image would go here.
    // For this prototype, we will log to console as setting up html2canvas requires external deps.
    // Ideally, we would draw the base image and the text onto a canvas and exportToBlob.
    console.log('Generating image with message:', this.message());

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/base.webp'; // Using public/base.webp as per spec

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) return;

      // Draw Base Image
      ctx.drawImage(img, 0, 0);

      // Draw Text
      // This is a simplified approximation of the CSS styles
      ctx.fillStyle = '#FFFFFF'; // White text
      ctx.font = 'bold 80px "Anton", sans-serif'; // Assuming Anton is loaded
      ctx.textAlign = 'center';

      // Position text - approximated from mockup
      ctx.fillText(this.message().toUpperCase(), canvas.width / 2, canvas.height - 200);

      // Download
      const link = document.createElement('a');
      link.download = 'xavier-poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  }

  share() {
    if (navigator.share) {
      navigator.share({
        title: 'Xavier 2026',
        text: '¡Mira mi póster para la campaña de Xavier!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Compartir no está soportado en este navegador.');
    }
  }
}
