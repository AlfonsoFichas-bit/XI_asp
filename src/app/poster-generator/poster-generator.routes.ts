import { Routes } from '@angular/router';
import { LiveEditorComponent } from './live-editor/live-editor.component';
import { OfficialPanelComponent } from './official-panel/official-panel.component';

export const POSTER_GENERATOR_ROUTES: Routes = [
  {
    path: 'live-editor',
    component: LiveEditorComponent,
  },
  {
    path: 'official-panel',
    component: OfficialPanelComponent,
  },
  {
    path: '',
    redirectTo: 'live-editor',
    pathMatch: 'full',
  },
];
