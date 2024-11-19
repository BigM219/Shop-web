import React from "react";
import { Link } from "react-router-dom";
import { useUpdateOrderStatusMutation } from "../../../features/order/orderApi";

export const OrderTable = ({ orders }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  //update order status
  const updateOrderHandler = (id, status) => {
    updateOrderStatus({
      orderId: id,
      data: {
        status: status,
      },
    });
  };
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
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <React.Fragment key={order._id}>
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
                    <select
                      disabled={order.status === "Đã hoàn thành"}
                      name="orderStatus"
                      defaultValue={order.status}
                      onChange={(e) => {
                        updateOrderHandler(order.order_id, e.target.value);
                      }}
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đã hủy">Đã hủy</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã hoàn thàn">Đã hoàn thành</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 sm:space-x-2 space-x-1">
                    {/* <Link to="/">Details</Link> */}
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
                    <td className="px-6 py-3 capitalize">{item.product.name}</td>
                    <td className="px-6 py-3 capitalize">{item.unit_price} đ</td>
                    <td className="px-6 py-3 capitalize">
                      Số lượng: {item.quantity}
                    </td>
                    <td className="px-6 py-3 cursor-pointer"></td>
                    <td className="px-6 py-3 sm:space-x-2 space-x-1"></td>
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
