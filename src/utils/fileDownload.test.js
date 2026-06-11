import { formatDataCategoriesSummary } from '../pages/dashTemplate/tabs/tableConfig/dataCategories';
import { convertToCSV } from './fileDownload';

describe('convertToCSV', () => {
  it('passes the row to custom download renderers', () => {
    const rows = [
      {
        study_name: 'Study A',
        _dataCategoryCount: 0,
        data_collection: [
          {
            data_collection_category: 'Age',
            data_collection_category_annotation_count: 2,
          },
          {
            data_collection_category: 'Biological Sex',
            data_collection_category_annotation_count: 1,
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
});
