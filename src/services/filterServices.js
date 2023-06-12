const handleFiltered = (query, data) => {
  const formattedQuery = query.toLowerCase();
  const newData = data.filter(row => {
    for (const key in row) {
      if (Object.hasOwnProperty.call(row, key)) {
        const value = row[key];
        if (typeof value === 'string') {
          const formattedValue = value.toLowerCase();
          if (formattedValue.includes(formattedQuery)) {
            return true;
          }
        }
      }
    }
    return false;
  });
  return newData;
};

export default handleFiltered;
