import { formatDataCategoriesSummary } from './dataCategories';

describe('formatDataCategoriesSummary', () => {
  it('returns the same count summary shown in the UI', () => {
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
});
