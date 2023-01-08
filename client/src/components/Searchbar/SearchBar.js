import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsAction } from "../../redux/slices/products/productSlices";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const changeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    e.preventDefault()
  };

  useEffect(() => {
    dispatch(fetchProductsAction(searchTerm));
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <form className="flex justify-center mb-4 mt-4 pb-4 border-b-2">
      <div className="relative w-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          value={searchTerm}
          onChange={changeSearchTerm}
          type="text"
          placeholder="Search Code"
          className="w-full py-2 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
        />
      </div>
    </form>
  );
}

export default SearchBar