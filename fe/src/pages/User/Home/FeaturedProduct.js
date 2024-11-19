import React from "react";
import { ProductCardSkeleton } from "../../../components/ui/ProductCardSkeleton";
import { ContainerHeader } from "../../../components/user/ContainerHeader";
import { ProductCard } from "../../../components/user/ProductCard";
import { useGetMoreProductsQuery } from "../../../features/product/productApi";


export const FeaturedProduct = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useGetMoreProductsQuery();

  // decide what to render
  let content;

  if (isLoading)
    content = (
      <>
        <ProductCardSkeleton /> <ProductCardSkeleton /> <ProductCardSkeleton />
        <ProductCardSkeleton /> <ProductCardSkeleton />
      </>
    );

  if (!isLoading && isError)
    content = (
      <h3 className=" uppercase font-medium text-yellow-950">
        something went wrong!
      </h3>
    );

  if (!isError && !isLoading && isSuccess && products?.length === 0)
    content = (
      <p className="text-center uppercase font-medium">No Product found!</p>
    );

  if (!isError && !isLoading && products?.length > 0)
    content = products.map((proudct) => (
      <ProductCard key={proudct._id} product={proudct} />
    ));

  return (
    <div>
      <div className="pt-28 pb-20 px-36">
        <h2 className="text-center mb-20 text-4xl font-bold text-black-200">
          <ContainerHeader title="SẢN PHẨM CỦA CHÚNG TÔI" />
        </h2>
        <div className="flex flex-wrap justify-around items-center w-full">
          <div className="mb-2 grid grid-cols-1 justify-center xs:justify-start xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-20">
            {content}
          </div>
        </div>
      </div>


{/*   
    
    <div className="pt-28 pb-20 px-36">
      <h2 className="text-center mb-20 text-3xl text-black-200">SẢN PHẨM CỦA CHÚNG TÔI</h2>
      <ul className="flex flex-wrap justify-around items-center w-full">

        <div className="item">
          
          <div className="justify-center self-start px-9 py-2.5 mt-5 text-sm text-center text-white bg-gray-200 rounded-md max-md:px-5 duration-900 ease-linear hover:bg-gray-300">
            <img
              loading="lazy"
              className="w-44 object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src={require('./EXAMPLE_LOGO1.jpg')}
              alt=""
            />
            <div className="stars">
              <span className="flex justify-center text-yellow-300">
                {Array(rating)
                  .fill()
                  .map((i) => (
                    <FaStar />
                  ))}
              </span>
            </div>
            <div className="name text-black">Hạt điều rang muối</div>
            <div className="desc text-gray-500">500g</div>
            <div className="price text-yellow-600">100.000 VNĐ</div>
            </div>
        </div>

        <div className="item">
        <div className="justify-center self-start px-9 py-2.5 mt-5 text-sm text-center text-white bg-gray-200 rounded-md max-md:px-5 duration-900 ease-linear hover:bg-gray-300">
            <img
              loading="lazy"
              className="w-44 object-fill rounded-xl h-32 sm:h-52 md:h-80"
              src={require('./EXAMPLE_LOGO2.jpg')}
              alt=""
            />
            <div className="stars ">
              <span className="flex justify-center text-yellow-300">
                {Array(rating)
                  .fill()
                  .map((i) => (
                    <FaStar />
                  ))}
              </span>
            </div>
            <div className="name text-black">Bánh hạt điều đồng tiền</div>
            <div className="desc text-gray-500">500g</div>
            <div className="price text-yellow-600">100.000 VNĐ</div>
            </div>
        </div>

        <div className="item">
        <div className="justify-center self-start px-9 py-2.5 mt-5 text-sm text-center text-white bg-gray-200 rounded-md max-md:px-5 duration-900 ease-linear hover:bg-gray-300">
            <img
              loading="lazy"
              className="w-44 object-fill rounded-xl h-29 sm:h-52 md:h-80"
              src={require('./EXAMPLE_LOGO3.jpg')}
              alt=""
            />
            <div className="stars">
              <span className="flex justify-center text-yellow-300">
                {Array(rating)
                  .fill()
                  .map((i) => (
                    <FaStar />
                  ))}
              </span>
            </div>
            <div className="name text-black">Thanh gạo lứt</div>
            <div className="desc text-gray-500">500g</div>
            <div className="price text-yellow-600">100.000 VNĐ</div>
            </div>
        </div>
        
      </ul>
    </div>*/}
    </div>
  );
};
