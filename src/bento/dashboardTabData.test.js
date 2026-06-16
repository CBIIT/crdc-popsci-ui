import { tabContainers } from './dashboardTabData';
import { cellTypes } from '@bento-core/table';

describe('dashboardTabData', () => {
  it('keeps protected studies columns out of View Columns while remaining visible', () => {
    const studiesTab = tabContainers.find((tab) => tab.name === 'Studies');
    const protectedHeaders = ['Study Acronym', 'Study Name', 'Participants'];

    protectedHeaders.forEach((header) => {
      const column = studiesTab.columns.find((col) => col.header === header);
      expect(column.display).toBe(true);
      expect(column.role).not.toBe(cellTypes.DISPLAY);
    });
  });

  it('gives non-protected studies columns role: cellTypes.DISPLAY so they appear in View Columns', () => {
    const studiesTab = tabContainers.find((tab) => tab.name === 'Studies');
    const hidableHeaders = [
      'Enrollment Period',
      'Study Period',
      'Study Design',
      'Study Status',
      'Cancer Types',
      'Data Categories',
      'Biospecimens',
      'Enrollment Age',
    ];

    hidableHeaders.forEach((header) => {
      const column = studiesTab.columns.find((col) => col.header === header);
      expect(column.role).toBe(cellTypes.DISPLAY);
    });
  });
});
