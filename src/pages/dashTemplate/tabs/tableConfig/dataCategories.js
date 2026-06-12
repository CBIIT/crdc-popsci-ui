import DataCollected from '../../../studyDetail/views/data_collection/data_collection.json';

export const formatDataCategoriesSummary = (data = []) => {
  const categoryData = Array.isArray(data) ? data : [];
  let nonZeroCount = 0;
  let totalCount = 0;

  DataCollected.data_collected.forEach((category) => {
    const categoryName = Object.keys(category)[0];
    category[categoryName].forEach((item) => {
      totalCount++;
      const matchingData = categoryData.find((entry) => entry.data_collection_category === item);
      if (matchingData && matchingData.data_collection_category_annotation_count > 0) {
        nonZeroCount++;
      }
    });
  });

  return `${nonZeroCount} of ${totalCount}`;
};
