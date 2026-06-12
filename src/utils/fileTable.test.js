import { FileDisableRowSelection, FileOnRowsSelect } from './fileTable';

describe('FileDisableRowSelection', () => {
  it('returns true when cartData is empty', () => {
    const data = { file_id: '123' };
    const cartData = [];

    expect(FileDisableRowSelection(data, cartData)).toBe(true);
  });

  it('returns true when cartData is null or undefined', () => {
    const data = { file_id: '123' };

    expect(FileDisableRowSelection(data, null)).toBe(true);
    expect(FileDisableRowSelection(data, undefined)).toBe(true);
  });

  it('returns false when the file_id is already in cartData', () => {
    const data = { file_id: '123' };
    const cartData = ['123', '456'];

    expect(FileDisableRowSelection(data, cartData)).toBe(false);
  });

  it('returns true when the file_id is not in cartData', () => {
    const data = { file_id: '789' };
    const cartData = ['123', '456'];

    expect(FileDisableRowSelection(data, cartData)).toBe(true);
  });
});

describe('FileOnRowsSelect', () => {
  it('returns an array of file_ids from selected rows', () => {
    const data = [
      { file_id: 'file-1', name: 'File 1' },
      { file_id: 'file-2', name: 'File 2' },
      { file_id: 'file-3', name: 'File 3' },
    ];
    const allRowsSelected = [
      { dataIndex: 0 },
      { dataIndex: 2 },
    ];

    const result = FileOnRowsSelect(data, allRowsSelected);

    expect(result).toEqual(['file-1', 'file-3']);
  });

  it('returns an empty array when no rows are selected', () => {
    const data = [
      { file_id: 'file-1', name: 'File 1' },
    ];
    const allRowsSelected = [];

    const result = FileOnRowsSelect(data, allRowsSelected);

    expect(result).toEqual([]);
  });
});
