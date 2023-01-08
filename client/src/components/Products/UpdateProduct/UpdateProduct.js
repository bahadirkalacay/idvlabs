import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  updateProductAction,
  fetchProductDetailsAction,
} from "../../../redux/slices/products/productSlices";

const formSchema = Yup.object({
  count: Yup.number(),
  code: Yup.number(),
  title: Yup.string(),
  description: Yup.string(),
});

const UpdateProduct = (props) => {
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

  const productUpdate = useSelector((state) => state.product);
  const { loading, appErr, serverErr, isUpdated } = productUpdate;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      count: productDetails?.count,
      code: productDetails?.code,
      title: productDetails?.title,
      description: productDetails?.description,
    },
    onSubmit: (values) => {
      const data = {
        count: values.count,
        code: values.code,
        description: values.description,
        title: values.title,
        id,
      };
      dispatch(updateProductAction(data));
    },
    validationSchema: formSchema,
  });

  if (isUpdated) return <Redirect to="/products" />;

  return (
    <>
      <div className="flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="w-full flex mb-2 ml-2">
          <a
            className="mt-2 inline-block text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center"
            href="/login"
          >
            Product List
          </a>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-blue-500">
            Inventory Update
          </h2>
          {appErr || serverErr ? (
            <h1 className="text-red-400 text-xl text-center">
              {serverErr} {appErr}
            </h1>
          ) : null}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name : {productDetails?.title}
                </label>
                <input
                  placeholder="New name..."
                  onChange={formik.handleChange("title")}
                  className="appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Description : {productDetails?.description}
                </label>
                <textarea
                  placeholder="New description..."
                  onChange={formik.handleChange("description")}
                  className="appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Code : {productDetails?.code}
                </label>
                <input
                  placeholder="New code..."
                  onChange={formik.handleChange("code")}
                  className="appearance-none mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="text-red-500">
                {formik.touched.code && formik.errors.code}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Count : {productDetails?.count}
                </label>
                <div className="mt-2">
                  <input
                    placeholder="New count..."
                    onChange={formik.handleChange("count")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
