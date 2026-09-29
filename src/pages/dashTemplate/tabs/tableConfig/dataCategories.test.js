import { formatDataCategoriesSummary } from './dataCategories';
import { convertToCSV } from '../../../../utils/fileDownload';

describe('formatDataCategoriesSummary', () => {
  it('returns the data category summary shown in the table', () => {
    expect(
      formatDataCategoriesSummary([
        {
          data_collection_category: 'Age',
          data_collection_category_annotation_count: 3,
        },
        {
          data_collection_category: 'Biological Sex',
          data_collection_category_annotation_count: 1,
        },
        {
          data_collection_category: 'Alcohol Consumption',
          data_collection_category_annotation_count: 0,
        },
      ]),
    ).toBe('2 of 70');
  });

  it('handles non-array values without producing object output', () => {
    expect(formatDataCategoriesSummary(null)).toBe('0 of 70');
  });

  it('formats the raw categories value when exporting a sorted column', () => {
    const rows = [
      {
        _dataCategoryCount: 2,
        data_collection: [
          {
            data_collection_category: 'Age',
            data_collection_category_annotation_count: 3,
          },
          {
            data_collection_category: 'Biological Sex',
            data_collection_category_annotation_count: 1,
          },
        ],
      },
    ];
    const columns = [
      {
        dataField: '_dataCategoryCount',
        _customDownloadRender: (_, row) => formatDataCategoriesSummary(row.data_collection),
      },
    ];

    expect(
      convertToCSV(
        JSON.stringify(rows),
        '',
        ['_dataCategoryCount'],
        ['Data Categories'],
        columns,
      ),
    ).toBe('Data Categories\r\n2 of 70\r\n');
  });
});
