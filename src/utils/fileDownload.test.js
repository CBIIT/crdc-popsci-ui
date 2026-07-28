import { formatDataCategoriesSummary } from '../pages/dashTemplate/tabs/tableConfig/dataCategories';
import {
  convertToCSV,
  createFileName,
  downloadCsvString,
  downloadJson,
  generateDownloadConfig,
} from './fileDownload';
import { cellTypes } from '@bento-core/table';

describe('createFileName', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('creates a timestamped csv file name by default', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T03:04:05'));

    expect(createFileName('manifest')).toBe('manifest 2024-01-02 03-04-05.csv');
  });

  it('supports custom extension and skipping extension formatting', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T03:04:05'));

    expect(createFileName('manifest', '.txt')).toBe('manifest 2024-01-02 03-04-05.txt');
    expect(createFileName('manifest', '.txt', false)).toBe('manifest 2024-01-02 03-04-05');
  });
});

describe('downloadCsvString', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('downloads csv content and appends .csv extension when missing', () => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = () => '';
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = () => {};
    }

    const anchor = document.createElement('a');
    const clickSpy = jest.spyOn(anchor, 'click').mockImplementation(() => {});
    const appendSpy = jest.spyOn(document.body, 'appendChild');
    const removeSpy = jest.spyOn(document.body, 'removeChild');
    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    const createObjectURLSpy = jest
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:download-url');
    const revokeObjectURLSpy = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    downloadCsvString('a,b', 'report');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(anchor.download).toBe('report.csv');
    expect(anchor.href).toBe('blob:download-url');
    expect(appendSpy).toHaveBeenCalledWith(anchor);
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith(anchor);
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:download-url');
  });

  it('keeps .csv extension when already present', () => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = () => '';
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = () => {};
    }

    const anchor = document.createElement('a');
    jest.spyOn(anchor, 'click').mockImplementation(() => {});
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:download-url-2');
    jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    downloadCsvString('a,b', 'report.csv');

    expect(anchor.download).toBe('report.csv');
  });
});

describe('convertToCSV', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('passes the row to custom download renderers', () => {
    const rows = [
      {
        study_name: 'Study A',
        _dataCategoryCount: 0,
        data_collection: [
          {
            data_collection_category: 'Age',
            data_collection_category_assessed: 'Yes',
          },
          {
            data_collection_category: 'Biological Sex',
            data_collection_category_assessed: 'Yes',
          },
        ],
      },
    ];

    const csv = convertToCSV(
      rows,
      '',
      ['study_name', '_dataCategoryCount'],
      ['Study Name', 'Data Categories'],
      [
        { dataField: 'study_name' },
        {
          dataField: '_dataCategoryCount',
          _customDownloadRender: (_, row) => formatDataCategoriesSummary(row?.data_collection),
        },
      ],
    );

    expect(csv).toContain('Study A,2 of 70');
    expect(csv).not.toContain('Study A,0 of 70');
  });

  it('handles comments with no special characters (no quoting needed)', () => {
    const rows = [{ User_Comment: 'old', name: 'John' }];
    
    const csv = convertToCSV(
      rows,
      'simple comment',
      ['User_Comment', 'name'],
      ['Comments', 'Name'],
      []
    );

    expect(csv).toContain('simple comment,John');
  });

  it('handles comments with commas but no quotes or newlines', () => {
    const rows = [{ User_Comment: 'old', name: 'John' }];
    
    const csv = convertToCSV(
      rows,
      'comment, with, commas',
      ['User_Comment', 'name'],
      ['Comments', 'Name'],
      []
    );

    expect(csv).toContain('"comment, with, commas"');
  });

  it('handles comments with newlines', () => {
    const rows = [{ User_Comment: 'old', name: 'John' }];
    
    const csv = convertToCSV(
      rows,
      'comment\nwith\nnewlines',
      ['User_Comment', 'name'],
      ['Comments', 'Name'],
      []
    );

    expect(csv).toContain('"comment\nwith\nnewlines"');
  });

  it('handles multiple rows with custom renderers', () => {
    const rows = [
      { id: 1, name: 'Test A', score: 100 },
      { id: 2, name: 'Test B', score: 200 },
    ];

    const csv = convertToCSV(
      rows,
      '',
      ['id', 'name', 'score'],
      ['ID', 'Name', 'Score'],
      [
        { dataField: 'id' },
        { dataField: 'name' },
        { dataField: 'score', _customDownloadRender: (val) => `${val}%` },
      ]
    );

    expect(csv).toContain('1,Test A,100%');
    expect(csv).toContain('2,Test B,200%');
  });

  it('handles columns without custom renderers', () => {
    const rows = [{ id: 1, name: 'Test' }];

    const csv = convertToCSV(
      rows,
      '',
      ['id', 'name'],
      ['ID', 'Name'],
      [{ dataField: 'id' }] // only id has config, name doesn't
    );

    expect(csv).toContain('1,Test');
  });

  it('handles special characters in field values', () => {
    const rows = [
      {
        description: 'Quote: "data"',
        note: 'Path: C:\\Users\\test',
      },
    ];

    const csv = convertToCSV(
      rows,
      '',
      ['description', 'note'],
      ['Description', 'Note'],
      []
    );

    expect(csv).toContain('"Quote: ""data"""');
  });

  it('throws when header is missing', () => {
    expect(() => convertToCSV([], '', ['a'], [])).toThrow('Header must be a non-empty array.');
  });

  it('throws when keysToInclude is missing', () => {
    expect(() => convertToCSV([], '', [], ['A'])).toThrow('Keys to include must be a non-empty array.');
  });

  it('adds escaped user comments in the first row and safely escapes values', () => {
    const rows = [
      {
        User_Comment: 'old',
        note: 'hello, "world"',
        emptyValue: null,
      },
    ];

    const csv = convertToCSV(
      rows,
      'line1, "quoted"',
      ['User_Comment', 'note', 'emptyValue'],
      ['User Comments', 'Note', 'Empty'],
      [{ dataField: 'note' }],
    );

    expect(csv).toContain('"line1, ""quoted"""');
    expect(csv).toContain('"hello, ""world"""');
    expect(csv).toContain(',"hello, ""world""",');
  });

  it('parses JSON input string and outputs blank for undefined values', () => {
    const rowsAsString = JSON.stringify([{ a: 'x', b: undefined }]);
    const csv = convertToCSV(rowsAsString, '', ['a', 'b'], ['A', 'B']);

    expect(csv).toContain('A,B');
    expect(csv).toContain('x,');
  });
});

describe('generateDownloadConfig', () => {
  it('returns only downloadable columns', () => {
    const columns = [
      { dataField: 'study', header: 'Study', display: true },
      { dataField: 'deleteBtn', header: 'Delete', cellType: cellTypes.DELETE },
      { dataField: 'hidden', header: 'Hidden', display: false },
      { dataField: 'headerDelete', header: 'Header Delete', headerType: cellTypes.DELETE },
      { dataField: 'program', header: 'Program' },
      { header: 'No dataField' },
    ];

    expect(generateDownloadConfig(columns)).toEqual({
      keysToInclude: ['study', 'program'],
      header: ['Study', 'Program'],
    });
  });

  it('returns empty arrays when no columns are downloadable', () => {
    const columns = [
      { dataField: 'deleteBtn', header: 'Delete', cellType: cellTypes.DELETE },
      { dataField: 'hidden', header: 'Hidden', display: false },
    ];

    expect(generateDownloadConfig(columns)).toEqual({
      keysToInclude: [],
      header: [],
    });
  });

  it('handles empty columns array', () => {
    expect(generateDownloadConfig([])).toEqual({
      keysToInclude: [],
      header: [],
    });
  });
});

describe('downloadJson', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('converts table data to CSV and triggers download', () => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = () => '';
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = () => {};
    }

    const anchor = document.createElement('a');
    const clickSpy = jest.spyOn(anchor, 'click').mockImplementation(() => {});
    const appendSpy = jest.spyOn(document.body, 'appendChild');
    const removeSpy = jest.spyOn(document.body, 'removeChild');
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:json-download');
    jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const tableData = [
      { id: 1, name: 'Test', value: 100 },
      { id: 2, name: 'Sample', value: 200 },
    ];
    const manifestData = {
      keysToInclude: ['id', 'name'],
      header: ['ID', 'Name'],
    };

    downloadJson(tableData, '', 'data', manifestData);

    expect(appendSpy).toHaveBeenCalledWith(anchor);
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith(anchor);
    expect(anchor.download).toMatch(/^data \d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.csv$/);
  });

  it('includes user comments in CSV output', () => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = () => '';
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = () => {};
    }

    const anchor = document.createElement('a');
    jest.spyOn(anchor, 'click').mockImplementation(() => {});
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    const createObjectURLSpy = jest
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:with-comments');
    jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const tableData = [{ id: 1, name: 'Test' }];
    const manifestData = {
      keysToInclude: ['id', 'name'],
      header: ['ID', 'Name'],
    };
    const comments = 'Export includes sensitive data';

    downloadJson(tableData, comments, 'secure', manifestData);

    const callArgs = createObjectURLSpy.mock.calls[0][0];
    expect(callArgs).toBeInstanceOf(Blob);
  });

  it('handles empty table data', () => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = () => '';
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = () => {};
    }

    const anchor = document.createElement('a');
    jest.spyOn(anchor, 'click').mockImplementation(() => {});
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:empty');
    jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const manifestData = {
      keysToInclude: ['id'],
      header: ['ID'],
    };

    downloadJson([], '', 'empty', manifestData);

    expect(anchor.download).toMatch(/^empty \d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.csv$/);
  });

  it('handles columns parameter when provided', () => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = () => '';
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = () => {};
    }

    const anchor = document.createElement('a');
    jest.spyOn(anchor, 'click').mockImplementation(() => {});
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:with-columns');
    jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const tableData = [{ id: 1, value: 100 }];
    const manifestData = {
      keysToInclude: ['id', 'value'],
      header: ['ID', 'Value'],
    };
    const columns = [
      { dataField: 'id' },
      { dataField: 'value', _customDownloadRender: (val) => `Value: ${val}` },
    ];

    downloadJson(tableData, '', 'with-columns', manifestData, columns);

    expect(anchor.download).toMatch(/^with-columns \d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}\.csv$/);
  });

  it('properly cleans up DOM elements after download', () => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = () => '';
    }
    if (!URL.revokeObjectURL) {
      URL.revokeObjectURL = () => {};
    }

    const anchor = document.createElement('a');
    const clickSpy = jest.spyOn(anchor, 'click').mockImplementation(() => {});
    const appendSpy = jest.spyOn(document.body, 'appendChild');
    const removeSpy = jest.spyOn(document.body, 'removeChild');

    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:cleanup-test');
    jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    downloadJson([{ test: 'data' }], '', 'cleanup', {
      keysToInclude: ['test'],
      header: ['Test'],
    });

    // Verify correct sequence: append called, then click called, then remove called
    expect(appendSpy).toHaveBeenCalledWith(anchor);
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith(anchor);
    
    // Verify call order: append → click → remove
    expect(appendSpy.mock.invocationCallOrder[0]).toBeLessThan(clickSpy.mock.invocationCallOrder[0]);
    expect(clickSpy.mock.invocationCallOrder[0]).toBeLessThan(removeSpy.mock.invocationCallOrder[0]);
  });
});
