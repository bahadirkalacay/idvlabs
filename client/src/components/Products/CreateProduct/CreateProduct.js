import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createproductAction } from "../../../redux/slices/products/productSlices";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  count: Yup.number().required("Count is required"),
  code: Yup.number().required("Code is required"),
  image: Yup.string().required("Image is required"),
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color:'red'
  transition: border 0.24s ease-in-out;
`;

const CreateProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.product);
  const { isCreated, loading, appErr, serverErr } = product;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      count: "",
      code: "",
      image: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        count: values?.count,
        title: values?.title,
        description: values?.description,
        code: values?.code,
        image: values?.image,
      };
      dispatch(createproductAction(data));
    },
    validationSchema: formSchema,
  });

  if (isCreated) return <Redirect to="/products" />;
  return (
    <>
      <div className="flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="flex mb-2 ml-2">
        <a className="mt-2 inline-block text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center" href="/login">
          Product List
        </a>
      </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-4 text-center text-2xl font-extrabold text-blue-500">
            Create Product
          </h2>
          {appErr || serverErr ? (
            <p className="mt-2 text-center text-lg text-red-600">
              {serverErr} {appErr}
            </p>
          ) : null}
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 mx-6 px-10 shadow sm:rounded-lg ">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    name="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.title && formik?.errors?.title}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Description
                </label>
                {/* Description */}
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-left leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                <div className="text-red-500">
                  {formik?.touched?.description && formik?.errors?.description}
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Count
                  </label>
                  <div className="mt-1">
                    {/* Count */}
                    <input
                      value={formik.values.count}
                      onChange={formik.handleChange("count")}
                      name="count"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik?.touched?.count && formik?.errors?.count}
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Code
                  </label>
                  <div className="mt-1">
                    {/* Code */}
                    <input
                      value={formik.values.code}
                      onChange={formik.handleChange("code")}
                      name="code"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik?.touched?.code && formik?.errors?.code}
                  </div>
                </div>
                {/* Image component */}
                <label className="block text-sm font-medium mt-3 mb-2 text-gray-700">
                  Select image to upload
                </label>
                <Container className="container bg-gray-700">
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik?.touched?.image && formik.errors?.image}
                </div>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Loading please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center w-full flex justify-center text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;