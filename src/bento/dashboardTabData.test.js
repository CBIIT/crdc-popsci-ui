import { createDownloadTableFunction } from './dashboardTabData';
import { generateDownloadConfig, downloadJson } from '../utils/fileDownload';

jest.mock('../utils/fileDownload', () => ({
  generateDownloadConfig: jest.fn(),
  downloadJson: jest.fn(),
}));

describe('createDownloadTableFunction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses current visible columns when creating download data', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({
        data: {
          tabStudy: [{ study_short_name: 'STUDY-1' }],
        },
      }),
    };
    const visibleColumns = [
      { dataField: 'study_short_name', header: 'Study Acronym', display: true },
    ];
    const tableConfig = {
      api: 'STUDY_QUERY',
      paginationAPIField: 'tabStudy',
      columns: [
        { dataField: 'study_short_name', header: 'Study Acronym', display: true },
        { dataField: 'study_name', header: 'Study Name', display: true },
      ],
      extendedViewConfig: {
        download: {
          downloadFileName: 'PSDC_Studies_download',
        },
      },
    };

    generateDownloadConfig.mockReturnValue({
      keysToInclude: ['study_short_name'],
      header: ['Study Acronym'],
    });

    const downloadTable = createDownloadTableFunction(
      client,
      { study_status: ['active'] },
      tableConfig,
      () => visibleColumns
    );

    await downloadTable();

    expect(client.query).toHaveBeenCalledWith({
      query: 'STUDY_QUERY',
      variables: { study_status: ['active'], offset: 0, first: 10000 },
    });
    expect(generateDownloadConfig).toHaveBeenCalledWith(visibleColumns);
    expect(downloadJson).toHaveBeenCalledWith(
      [{ study_short_name: 'STUDY-1' }],
      '',
      'PSDC_Studies_download',
      { keysToInclude: ['study_short_name'], header: ['Study Acronym'] },
      visibleColumns
    );
  });
});
