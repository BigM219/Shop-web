import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../../components/common/Form/Form";
import { FormInput } from "../../../components/common/FormInput/FormInput";
import { Heading } from "../../../components/common/Heading/Heading";
import { Error } from "../../../components/ui/Error";
import { useAddProductMutation } from "../../../features/product/productApi";
import { setTitle } from "../../../utils/setTitle";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [image_url, setPicture] = useState(null);
  // const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock_quantity, setStock] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //add product api
  const [addProduct, { isLoading: resLoading, isSuccess, error: resError }] =
    useAddProductMutation();

  useEffect(() => {
    setError("");
    if (!resLoading && isSuccess) {
      toast.success("Product Added SuccessFull");
      return navigate("/admin/all-products");
    }
    if (resError?.error) {
      setError(resError.error);
    }
    if (resError?.status === 500) {
      setError("Internal Server Error");
    }
  }, [resLoading, isSuccess, resError, navigate]);

  //submit form for add product
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name,
      image_url,
      category,
      price,
      stock_quantity,
      "category_id": 1,
    });
  };

  //set page title
  setTitle("Add a new product");

  return (
    <section>
      <Heading title="Add Product" />
      <div className="flex justify-end shadow-sm py-2 rounded-md">
        <Link
          to="/admin/all-products"
          className=" bg-green-600 px-2 mr-1 py-1 uppercase rounded-md text-gray-50 font-normal"
        >
          All Products
        </Link>
      </div>

      <div className=" mt-4 w-full flex justify-center py-2 sm:py-9 px-2 sm:shadow-md rounded-md">
        <div className=" w-full bg-gray-50 shadow-md p-1 py-5 rounded-md">
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
                  placeholder="product picture"
                  onChange={(e) => setPicture(e.target.value)}
                />
                <FormInput
                  label="Product Category"
                  type="text"
                  name="picture"
                  placeholder="Category"
                  onChange={(e) => setCategory(e.target.value)}
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
                  Thêm
                </button>
                
              </div>
            </div>
          </Form>
          {error !== "" && <Error error={error} />}
        </div>
      </div>
    </section>
  );
};
