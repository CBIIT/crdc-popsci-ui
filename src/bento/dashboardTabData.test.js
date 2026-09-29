import { tabContainers } from './dashboardTabData';

describe('dashboardTabData', () => {
  it('keeps protected Studies columns visible and out of View Columns', () => {
    const studiesTab = tabContainers.find((tab) => tab.name === 'Studies');
    const protectedHeaders = ['Study Acronym', 'Study Name', 'Participants'];

    protectedHeaders.forEach((header) => {
      const column = studiesTab.columns.find((columnConfig) => columnConfig.header === header);
      expect(column.display).toBe(true);
      expect(column.viewColumns).toBe(false);
    });
  });
});
