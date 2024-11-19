import React from "react";
import { AiOutlineCar, AiOutlineDollar, AiOutlinePhone } from "react-icons/ai";

export const AboutUs = () => {
  return (
    <div className="pt-28 pb-20 px-36">
      
      <ul className="flex flex-wrap justify-around items-center w-full">
        <div className="flex flex-col items-center px-100 mt-100 w-full bg-yellow-500/10 max-md:max-w-full rounded-md">
          <h2 className="text-center mb-10 mt-[-10] text-4xl font-bold text-black-200 pt-10">VỀ CHÚNG TÔI</h2>
          <main className="flex flex-col items-center py-10 mt-0 w-full bg-white max-md:max-w-full rounded-md max-w-[1200px]">
            <section className="flex flex-col px-5 mt-5 w-full max-w-[1165px] max-md:max-w-full">
              <div className="self-center w-full max-w-[1071px] max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                    <section className="flex flex-col grow text-xl text-neutral-900 max-md:mt-5 max-md:max-w-full">
                      <img
                        loading="lazy"
                        className="mt-2 w-90 max-md:max-w-full"
                        src={require('./EXAMPLE_LOGOabout.jpg')}
                        alt=""
                      />
                    </section>
                  </div>
                  <aside className="flex flex-col mr-4 w-[45%] max-md:ml-0 max-md:w-full">
                    <h1 className="mt-1 mb-4 text-2xl font-bold text-black max-md:max-w-full">Tên Doanh Nghiệp: Điều Bình Minh</h1>
                    <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full">Lĩnh Vực Hoạt Động: Sản Xuất Và Phân Phối Sản Phẩm Thực Phẩm Từ Hạt Điều</div>
                    <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full">Địa Điểm: Trụ Sở Chính Tại Bình Phước, Việt Nam - Khu Vực Nổi Tiếng Với Ngành Trồng Điều</div>
                    <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full">Phương Châm: "Chất Lượng Tạo Nên Niềm Tin"</div>
                    <div className="flex justify-between mt-2">
                    <div className="flex gap-x-4 mr-29">
                      <button
                        className="flex items-center px-6 py-2.5 bg-gray-200 text-black-600 border border-black w-50 rounded-md whitespace-nowrap text-sm">
                        <AiOutlineCar className="mr-2" />
                        Fast Delivery
                      </button>
                      <button
                        className="flex items-center px-6 py-2.5 bg-gray-200 text-black-600 border border-black w-50 rounded-md whitespace-nowrap text-sm">                    
                        <AiOutlineDollar className="mr-2" />
                        Easy Payments
                      </button>
                      <button
                        className="flex items-center px-6 py-2.5 bg-gray-200 text-black-600 border border-black w-50 rounded-md whitespace-nowrap text-sm">
                        <AiOutlinePhone className="mr-2" />
                        24/7 Service
                      </button>
                    </div>
                    </div>
                  </aside>                  
                </div>
              </div>
            </section>
          </main>
        </div>
      </ul>
    </div>
  );
};
