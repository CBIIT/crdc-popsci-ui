import DataCollected from '../../../studyDetail/views/data_collection/data_collection.json';

export const formatDataCategoriesSummary = (data = []) => {
  const categoryData = Array.isArray(data) ? data : [];
  let nonZeroCount = 0;
  let totalCount = 0;

  DataCollected.data_collected.forEach((category) => {
    const categoryName = Object.keys(category)[0];
    category[categoryName].forEach((item) => {
      totalCount++;
      const matchingData = categoryData.find((d) => d.data_collection_category === item);
      if (matchingData && matchingData.data_collection_category_assessed === "Yes") {
        nonZeroCount++;
      }
    });
  });

  return `${nonZeroCount} of ${totalCount}`;
};
