export const sortWidgetDataByKey = (array, key='group') => {
  return array.sort((a, b) => {
    let valueA = a[key];
    let valueB = b[key];

    // If the values are strings, clean them before comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.replace(/[^a-zA-Z ]/g, '').trim();
      valueB = valueB.replace(/[^a-zA-Z ]/g, '').trim();
      return valueB.localeCompare(valueA);
    }

    // For non-string types, use simple comparison
    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
  });
}