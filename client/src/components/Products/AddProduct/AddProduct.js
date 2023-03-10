import React, { useEffect} from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  updateProductAction,
  fetchProductDetailsAction,
} from "../../../redux/slices/products/productSlices";
import { baseUrl } from "../../../utils/baseUrl";

const formSchema = Yup.object({
  count: Yup.number().required("Count is required"),
});

const AddProduct = (props) => {
  const {
    computedMatch: {
      params: { id },
    },
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetailsAction(id));
  }, [id, dispatch]);

  const productData = useSelector((state) => state.product);
  const { productDetails } = productData;
  console.log(productDetails)
  
  const productUpdate = useSelector((state) => state.product);
  const { loading, appErr, serverErr, isUpdated } = productUpdate;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      count: productDetails?.count,
    },

    onSubmit: (values) => {
      const data = {
        count: productDetails?.count - values.count,
        id,
      };
      if (data.count < 0) {
        return console.log("Islem basarisiz")
      }
      dispatch(updateProductAction(data));
    },
    validationSchema: formSchema,
    
  });

  if (isUpdated) return <Redirect to="/products" />;
  return (
    <>
    <div className="flex flex-col justify-center sm:px-6 lg:px-8">
    <div className="w-full flex mb-2 ml-2">
        <a className="mt-2 inline-block text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center" href="/login">
          Product List
        </a>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-blue-500">
          Pull from Inventory
        </h2>
        {appErr || serverErr ? (
          <h1 className="text-red-400 text-xl text-center">
            {serverErr} {appErr}
          </h1>
        ) : null} 
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <img src={`${baseUrl}/product/${productDetails?.image}`} alt=""/>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Product Name : {productDetails?.title}
              </label>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Product Description :{productDetails?.description}
              </label>
            </div>
            <div>
              <label className="block  font-medium text-gray-700">
                Product Code : {productDetails?.code}
              </label>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Product Count : {productDetails?.count}
              </label>
              <div className="mt-2">
                <input
                  placeholder="Desired Count"
                  onChange={formik.handleChange("count")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="text-red-500">
                {formik.touched.count && formik.errors.count}
              </div>
            </div>
            <div>
              {loading ? (
                <button
                  disabled
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 "
                >
                  Loading please wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Order
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default AddProduct