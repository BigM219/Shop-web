import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../features/cart/cartSelectors";
import { setTitle } from "../../../utils/setTitle";
import { CheckOutItems } from "./CheckOutItems";
import { CheckOutTotal } from "./CheckOutTotal";
export const CheckOut = () => {
  const cartItems = useSelector(selectCartItems);

  //deside
  let content;
  if (cartItems?.length === 0) content = <>Giỏ hàng trống!</>;
  if (cartItems?.length > 0)
    content = cartItems?.map((item) => (
      <CheckOutItems key={item.product_id} item={item} />
    ));

  
  
  //set page title
  setTitle("CheckOut");

  return (
    <div className="container mx-auto my-auto px-20 py-20">
      <div className="md:grid md:grid-cols-4 md:gap-x-4">
        <div className="shadow-md rounded-md p-3 w-full md:col-span-3">
          <div className=" overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th scope="col" className="text-center text-base font-medium text-black bg-orange-50 px-20 py-3">
                    
                  </th>
                  <th scope="col" className="text-center text-base font-medium text-black bg-orange-50 px-6 py-3">
                    Sản phẩm
                  </th>
                  <th scope="col" className="text-center text-base font-medium text-black bg-orange-50 px-6 py-3">
                    Đơn giá
                  </th>
                  <th scope="col" className="text-center text-base font-medium text-black bg-orange-50 px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="text-center text-base font-medium text-black bg-orange-50 px-6 py-3">
                    Số tiền
                  </th>
                  <th scope="col" className="text-center text-base font-medium text-black bg-orange-50 px-6 py-3">
                    
                  </th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
        <CheckOutTotal/>
      </div>
    </div>

  );
};
