export const sortData = (data, sortedColumn, sortOrder) => {
  return [...data].sort((a, b) => {
    if (sortedColumn) {
      const valueA = a[sortedColumn].toLowerCase();
      const valueB = b[sortedColumn].toLowerCase();
      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      return 0;
    }
  });
};

export const getPageData = (sortedData, currentPage, perPage) => {
  const pageCount = Math.ceil(sortedData.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  return { currentPageData, pageCount };
};
