import React from "react";
import { useLocation } from "react-router-dom";

const CategoryFilter = ({ data }) => {
  const location = useLocation();
  const { categoryName } = location.state || {};

  const filteredData = data.filter(
    (item) => item.categoryName === categoryName
  );

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">
        {categoryName} ga tegishli ma'lumotlar
      </h1>
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index} className="mb-2 p-2 border bg-gray-100 rounded-md">
              {item.categoryName}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu kategoriya uchun ma'lumot topilmadi.</p>
      )}
    </div>
  );
};

export default CategoryFilter;
