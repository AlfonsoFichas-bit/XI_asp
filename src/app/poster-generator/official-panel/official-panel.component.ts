import { Component, signal, ViewChild, ElementRef } from '@angular/core';
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
  name = signal('Carlos');
  @ViewChild('posterCard') posterCard!: ElementRef<HTMLDivElement>;

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }

  downloadCard() {
    if (!this.posterCard) return;

    html2canvas(this.posterCard.nativeElement, {
        scale: 2, // Higher resolution
        useCORS: true, // For loading external images if any (though base.webp is local)
        backgroundColor: null,
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `xavier-poster-${this.name()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error('Download failed', err);
        alert('Error al generar la imagen. Por favor intenta de nuevo.');
    });
  }
}
