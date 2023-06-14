import { useState, useEffect } from "react";

export const useData = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return [];
    }
  });

  useEffect(() => {
    console.log(data);
  }, [data]); // data değiştiği zaman bu useEffect tekrar çalışacak

  return { data };
};
