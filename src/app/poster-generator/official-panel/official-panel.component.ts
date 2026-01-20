import { Component, signal, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-official-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './official-panel.component.html',
})
export class OfficialPanelComponent {
  name = signal('CARLOS');
  @ViewChild('posterCard') posterCard!: ElementRef<HTMLDivElement>;

  // Calculate font size based on name length to avoid overflow
  getFontSize() {
    const length = this.name().length;
    if (length < 6) return 80;
    if (length < 10) return 60;
    if (length < 15) return 45;
    return 35;
  }

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    // Enforce uppercase
    this.name.set(input.value.toUpperCase());
  }

  downloadCard() {
    if (!this.posterCard) return;

    // Use a slight timeout to ensure any rendering updates are finished
    setTimeout(() => {
        html2canvas(this.posterCard.nativeElement, {
            scale: 2, // Higher resolution for print quality
            useCORS: true,
            backgroundColor: null,
            logging: false,
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = `VOTA-POR-XAVIER-${this.name()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch((err: unknown) => {
            console.error('Download failed', err);
            alert('Error al generar la imagen. Por favor intenta de nuevo.');
        });
    }, 100);
  }
}
