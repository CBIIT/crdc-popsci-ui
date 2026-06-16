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
});
