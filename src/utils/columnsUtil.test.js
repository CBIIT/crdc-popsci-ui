import updateColumns, { hasMultiStudyParticipants } from './columnsUtil';

describe('columnsUtil', () => {
  describe('updateColumns', () => {
    it('sets options.viewColumns to false for disabled columns using case-insensitive match', () => {
      const columns = [
        { label: 'Study Name', options: { viewColumns: true } },
        { label: 'Program', options: { viewColumns: true } },
      ];
      const columnList = [
        { header: 'study name', viewColumns: false },
        { header: 'Program', viewColumns: true },
      ];

      const result = updateColumns(columns, columnList);

      expect(result[0].options.viewColumns).toBe(false);
      expect(result[1].options.viewColumns).toBe(true);
    });

    it('ignores disabled columns that do not exist in columns', () => {
      const columns = [
        { label: 'Study Name', options: { viewColumns: true } },
      ];
      const columnList = [
        { header: 'Not Present', viewColumns: false },
      ];

      const result = updateColumns(columns, columnList);

      expect(result[0].options.viewColumns).toBe(true);
    });
  });

  describe('hasMultiStudyParticipants', () => {
    it('returns false for empty tableMeta', () => {
      expect(hasMultiStudyParticipants([])).toBe(false);
    });

    it('returns true for non-empty tableMeta', () => {
      expect(hasMultiStudyParticipants([{}])).toBe(true);
    });
  });
});
