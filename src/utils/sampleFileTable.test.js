import { SampleDisableRowSelection, SampleOnRowsSelect } from './sampleFileTable';

describe('sampleFileTable utilities', () => {
  describe('SampleDisableRowSelection', () => {
    it('returns true when cart is empty', () => {
      const data = {
        files: [{ file_id: 'file1' }, { file_id: 'file2' }],
      };
      const cartData = [];

      expect(SampleDisableRowSelection(data, cartData)).toBe(true);
    });

    it('returns false when cart is not empty and data has no files', () => {
      const data = { files: [] };
      const cartData = ['file1'];

      expect(SampleDisableRowSelection(data, cartData)).toBe(false);
    });

    it('returns false when cart is not empty and data has no files property', () => {
      const data = {};
      const cartData = ['file1'];

      expect(SampleDisableRowSelection(data, cartData)).toBe(false);
    });

    it('returns true when cart is not empty and not all files are in cart', () => {
      const data = {
        files: [
          { file_id: 'file1' },
          { file_id: 'file2' },
          { file_id: 'file3' },
        ],
      };
      const cartData = ['file1']; // Only one file in cart

      expect(SampleDisableRowSelection(data, cartData)).toBe(true);
    });

    it('returns false when cart is not empty and all files are in cart', () => {
      const data = {
        files: [
          { file_id: 'file1' },
          { file_id: 'file2' },
        ],
      };
      const cartData = ['file1', 'file2'];

      expect(SampleDisableRowSelection(data, cartData)).toBe(false);
    });

    it('handles large cart data correctly when all files are included', () => {
      const data = {
        files: [
          { file_id: 'file1' },
          { file_id: 'file2' },
          { file_id: 'file3' },
        ],
      };
      const cartData = Array.from({ length: 100 }, (_, i) => `file${i}`);

      expect(SampleDisableRowSelection(data, cartData)).toBe(false);
    });

    it('returns true when some but not all files are in cart', () => {
      const data = {
        files: [
          { file_id: 'file1' },
          { file_id: 'file2' },
          { file_id: 'file3' },
        ],
      };
      const cartData = ['file1', 'file2']; // Two of three files in cart

      expect(SampleDisableRowSelection(data, cartData)).toBe(true);
    });

    it('handles files with additional properties', () => {
      const data = {
        files: [
          { file_id: 'file1', name: 'sample1.txt', size: 1024 },
          { file_id: 'file2', name: 'sample2.txt', size: 2048 },
        ],
      };
      const cartData = ['file1', 'file2'];

      expect(SampleDisableRowSelection(data, cartData)).toBe(false);
    });

    it('is case-sensitive for file_id matching', () => {
      const data = {
        files: [{ file_id: 'FILE1' }],
      };
      const cartData = ['file1'];

      expect(SampleDisableRowSelection(data, cartData)).toBe(true);
    });

    it('returns true when single file is not in cart', () => {
      const data = {
        files: [{ file_id: 'file1' }],
      };
      const cartData = ['file2'];

      expect(SampleDisableRowSelection(data, cartData)).toBe(true);
    });
  });

  describe('SampleOnRowsSelect', () => {
    it('returns empty array when no rows are selected', () => {
      const data = [
        {
          sample_id: 'sample1',
          files: [{ file_id: 'file1' }, { file_id: 'file2' }],
        },
      ];
      const allRowsSelected = [];

      expect(SampleOnRowsSelect(data, allRowsSelected)).toEqual([]);
    });

    it('returns array of file IDs for single selected row', () => {
      const data = [
        {
          sample_id: 'sample1',
          files: [{ file_id: 'file1' }, { file_id: 'file2' }],
        },
      ];
      const allRowsSelected = [{ dataIndex: 0 }];

      expect(SampleOnRowsSelect(data, allRowsSelected)).toEqual(['file1', 'file2']);
    });

    it('returns combined file IDs for multiple selected rows', () => {
      const data = [
        {
          sample_id: 'sample1',
          files: [{ file_id: 'file1' }, { file_id: 'file2' }],
        },
        {
          sample_id: 'sample2',
          files: [{ file_id: 'file3' }, { file_id: 'file4' }],
        },
      ];
      const allRowsSelected = [{ dataIndex: 0 }, { dataIndex: 1 }];

      expect(SampleOnRowsSelect(data, allRowsSelected)).toEqual([
        'file1', 'file2', 'file3', 'file4',
      ]);
    });

    it('skips rows with no files', () => {
      const data = [
        {
          sample_id: 'sample1',
          files: [{ file_id: 'file1' }],
        },
        {
          sample_id: 'sample2',
          files: [],
        },
        {
          sample_id: 'sample3',
          files: [{ file_id: 'file2' }],
        },
      ];
      const allRowsSelected = [{ dataIndex: 0 }, { dataIndex: 1 }, { dataIndex: 2 }];

      expect(SampleOnRowsSelect(data, allRowsSelected)).toEqual(['file1', 'file2']);
    });

    it('skips rows with null files', () => {
      const data = [
        {
          sample_id: 'sample1',
          files: [{ file_id: 'file1' }],
        },
        {
          sample_id: 'sample2',
          files: null,
        },
      ];
      const allRowsSelected = [{ dataIndex: 0 }, { dataIndex: 1 }];

      expect(SampleOnRowsSelect(data, allRowsSelected)).toEqual(['file1']);
    });

    it('handles rows with no files property', () => {
      const data = [
        {
          sample_id: 'sample1',
          files: [{ file_id: 'file1' }],
        },
        {
          sample_id: 'sample2',
        },
      ];
      const allRowsSelected = [{ dataIndex: 0 }, { dataIndex: 1 }];

      expect(SampleOnRowsSelect(data, allRowsSelected)).toEqual(['file1']);
    });

    it('preserves order of files from selected rows', () => {
      const data = [
        {
          sample_id: 'sample1',
          files: [{ file_id: 'fileA' }, { file_id: 'fileB' }],
        },
        {
          sample_id: 'sample2',
          files: [{ file_id: 'fileC' }],
        },
      ];
      const allRowsSelected = [{ dataIndex: 0 }, { dataIndex: 1 }];

      expect(SampleOnRowsSelect(data, allRowsSelected)).toEqual(['fileA', 'fileB', 'fileC']);
    });

    it('handles large datasets', () => {
      const data = Array.from({ length: 100 }, (_, i) => ({
        sample_id: `sample${i}`,
        files: [{ file_id: `file${i}` }],
      }));
      const allRowsSelected = Array.from({ length: 100 }, (_, i) => ({ dataIndex: i }));

      const result = SampleOnRowsSelect(data, allRowsSelected);
      expect(result).toHaveLength(100);
      expect(result[0]).toBe('file0');
      expect(result[99]).toBe('file99');
    });
  });
});
