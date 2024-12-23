import React from "react";

export const MyOrderList = ({ orders }) => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Picture
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <React.Fragment key={order.order_id}>
                {/* Order row */}
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 ">
                    <span className="capitalize"> Mã đơn hàng :</span>
                    {order.order_id}
                  </th>
                  <td className="px-6 py-3 capitalize"></td>
                  <td className="px-6 py-3 capitalize">
                    Tổng: {order.total_amount} đ
                  </td>
                  <td className="px-6 py-3 capitalize">{order.stock}</td>
                  <td className="px-6 py-3 cursor-pointer">
                    {order.status}
                  </td>
                </tr>

                {/* Items rows */}
                {order?.order_items?.map((item) => (
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <img
                        src={item.product.image_url}
                        alt="brand"
                        className="w-11 h-11 rounded-full ring-2 ring-green-700 p-1"
                      />
                    </th>
                    <td className="px-6 py-3 capitalize">{item.name}</td>
                    <td className="px-6 py-3 capitalize">{item.unit_price} đ</td>
                    <td className="px-6 py-3 capitalize">
                      Số lượng: {item.quantity}
                    </td>
                    <td className="px-6 py-3 cursor-pointer"></td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
