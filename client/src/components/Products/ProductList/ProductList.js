import {
  fetchProductsAction,
  deleteProductAction,
} from "../../../redux/slices/products/productSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl";
import { useEffect } from "react";
import SearchBar from "../../Searchbar/SearchBar";
import { Link } from "react-router-dom";

const ProductList = () => {
  const product = useSelector((state) => state?.product);
  const { productLists, appErr, serverErr, isDeleted } = product;
  console.log(productLists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction(""));
  }, [dispatch, isDeleted]);

  return (
    <>
      <section>
        <div className="w-full">
          <SearchBar />
          {appErr || serverErr ? (
            <h1 className="text-white text-center text-lg ">
              {serverErr} {appErr}
            </h1>
          ) : productLists?.length <= 0 ? (
            <h1 className="text-black text-lg text-center">No Product Found</h1>
          ) : (
            productLists?.map((product) => (
              <div
                key={product.id}
                className="flex justify-center max-h-36 h-36 mt-4 border-b-2"
              >
                <div className="ml-1">
                  <img
                    src={`${baseUrl}/product/${product?.image}`}
                    alt=""
                    className="h-36 w-36 pb-2"
                  />
                </div>
                <div className="ml-2 w-1/2 grid overflow-y-auto">
                  <div className="flex">
                    <p className="text-red-500 pr-1 font-bold">Name:</p>
                    <p className="font-bold">{product?.title}</p>
                  </div>
                  <div className="flex">
                    <p className="text-red-500 pr-1 font-bold">Description:</p>
                    <p className="font-bold">{product?.description}</p>
                  </div>
                  <div className="flex">
                    <p className="text-red-500 pr-1 font-bold">Count:</p>
                    <p className="font-bold">{product?.count}</p>
                  </div>
                  <div className="flex">
                    <p className="text-red-500 pr-1 font-bold">Code:</p>
                    <p className="font-bold">{product?.code}</p>
                  </div>
                </div>
                <div className="grid mr-1">
                  <div>
                    <Link to={`/update-product/${(product._id)}`}>
                    <button className="text-white bg-gradient-to-r w-24 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Update
                    </button>
                    </Link>
                  </div>
                  <div>
                  <Link to={`/add-product/${(product._id)}`}>
                    <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-24">
                      Add Card
                    </button>
                  </Link>
                  </div>
                  <div>
                    <button
                      onClick={() => dispatch(deleteProductAction(product._id))}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-24"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default ProductList;