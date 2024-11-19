import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Form } from "../../../components/common/Form/Form";
import { FormInput } from "../../../components/common/FormInput/FormInput";
// import { SelectBox } from "../../../components/common/FormInput/SelectBox";
// import { Textarea } from "../../../components/common/FormInput/Textarea";
import { Error } from "../../../components/ui/Error";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../features/product/productApi";

export const ProductModal = ({ closeModal, productId }) => {
  const [name, setName] = useState("");
  const [image_url, setPicture] = useState(null);
  // const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [stock_quantity, setStock] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  //get product by productId
  const {
    data: product,
    isLoading: productLoading,
    isSuccess: productIsSuccess,
  } = useGetProductQuery(productId);

  //get categories by brnad I

  //update product api
  const [updateProduct, { isLoading: resLoading, isSuccess, error: resError }] =
    useUpdateProductMutation();

  //set old product data
  useEffect(() => {
    if (!productLoading && productIsSuccess) {
      const { name, price, stock_quantity, image_url, category } = product;
      setName(name);
      setPrice(price);
      setStock(stock_quantity);
      // setDescription(description);
      setPicture(image_url);
      setCategory(category);
    }
  }, [productLoading, productIsSuccess, product]);

  //set brand info and call get category by brand Id

  useEffect(() => {
    setError("");
    if (!resLoading && isSuccess) {
      toast.success("Product Update SuccessFull");
      return closeModal(false);
    }
    if (resError?.error) {
      setError(resError.error);
    }
    if (resError?.status === 500) {
      setError("Internal Server Error");
    }
  }, [resLoading, isSuccess, resError, closeModal]);

  //handle update submit
  // const {category_id} = product;
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct({ productId, data: {
      name,
      price,
      stock_quantity,
      category,
      image_url,
    } });
  };

  return (
    <section>
      <div className="absolute top-0 left-0 w-screen min-h-full h-auto z-50 flex justify-center items-center bg-black/50">
        <div className=" w-full flex justify-center py-2 sm:py-9 px-2 sm:shadow-md rounded-md">
          <div className=" w-full bg-gray-50 shadow-md p-5 rounded-md">
            <div className="flex justify-between items-center mb-4 ">
              <p className="text-xl font-normal capitalize">Update Product</p>
              <button
                className="bg-red-400 rounded-md px-2 text-white"
                onClick={() => closeModal(false)}
              >
                X
              </button>
            </div>
            <Form>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <FormInput
                    label="Product Name"
                    type="text"
                    name="name"
                    placeholder="product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormInput
                    label="Product Picture"
                    type="text"
                    name="picture"
                    value={image_url}
                    onChange={(e) => setPicture(e.target.value)}
                  />

                  <FormInput
                    label="Product category"
                    type="text"
                    name="category"
                    value={category}
                    onChange={(e) => setPicture(e.target.value)}
                  />
                </div>
                <div>
                  <FormInput
                    label="Product Price"
                    type="number"
                    name="price"
                    placeholder="product price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <FormInput
                    label="Stock"
                    type="number"
                    name="stock"
                    placeholder="product stock"
                    value={stock_quantity}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />

                  {/* <Textarea
                    label="Description"
                    name="description"
                    placeholder="product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  /> */}

                  <button onClick={handleSubmit} className="flex justify-center items-start px-5 py-4 mt-9 w-full text-base text-white bg-yellow-700 rounded-xl max-md:max-w-full" >
                    Cập nhật
                  </button>
                </div>
              </div>
            </Form>
            {error !== "" && <Error error={error} />}
          </div>
        </div>
      </div>
    </section>
  );
};
