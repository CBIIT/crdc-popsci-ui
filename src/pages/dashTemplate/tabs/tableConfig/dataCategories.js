import DataCollected from '../../../studyDetail/views/data_collection/data_collection.json';

export const getDataCategoryCount = (data = []) => {
  const categoryData = Array.isArray(data) ? data : [];
  let nonZeroCount = 0;

  DataCollected.data_collected.forEach((category) => {
    const categoryName = Object.keys(category)[0];
    category[categoryName].forEach((item) => {
      const matchingData = categoryData.find((entry) => entry.data_collection_category === item);
      if (matchingData && matchingData.data_collection_category_annotation_count > 0) {
        nonZeroCount += 1;
      }
    });
  });

  return nonZeroCount;
};

export const formatDataCategoriesSummary = (data = []) => {
  const totalCount = DataCollected.data_collected.reduce(
    (count, category) => count + Object.values(category)[0].length,
    0,
  );

  return `${getDataCategoryCount(data)} of ${totalCount}`;
};
