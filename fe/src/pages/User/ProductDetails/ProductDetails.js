import React from "react";
import { toast } from "react-hot-toast";
import {
  FaStar,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
// import { Link, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "../../../components/ui/ProductDetailsSkeleton";
import { addToCart } from "../../../features/cart/addToCartSlice";
import { useGetProductQuery } from "../../../features/product/productApi";
import { setTitle } from "../../../utils/setTitle";
import { FeaturedProduct } from "../Home/FeaturedProduct";

export const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const rating = 5;
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductQuery(productId);

  if (isLoading)
    return (
      <>
        <ProductDetailsSkeleton />
      </>
    );

  if (!isLoading && isError)
    return (
      <h3 className=" uppercase font-medium text-yellow-950">
        something went wrong!
      </h3>
    );

  if (!isError && !isLoading && isSuccess && product?.length === 0)
    return (
      <p className="text-center uppercase font-medium">Không tìm thấy sản phẩm!</p>
    );
  const { name, price, image_url, category } = product || {};
  // const { name, picture, price, category, category_id } = product || {};

  // const categoryId = category_id;

  //add to cart
  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
    toast.success("Product Add To Cart");
  };

  //set ppage title
  setTitle(`${name} - Product Details`);
  return (
    <div className="flex flex-col items-center py-20 px-100 mt-100 w-full bg-yellow-500/10 max-md:max-w-full rounded-md">
      <main className="flex flex-col items-center py-20 mt-0 w-full bg-white max-md:max-w-full rounded-md max-w-[1200px]">
        <section className="flex flex-col px-5 mt-5 w-full max-w-[1165px] max-md:max-w-full">
          <div className="self-center w-full max-w-[1071px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                <section className="flex flex-col grow text-xl text-neutral-900 max-md:mt-5 max-md:max-w-full">
                  {/* <div className="flex gap-1.5 self-start py-1.5">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/276c939f18c5965f3b16448e263304bc078c45788671961cc1ceca8bb284a3e9?apiKey=25dae93728374761a999bafcb7d5e663&" alt="Product category" className="shrink-0 my-auto w-6 aspect-square" />
                    <div>Sản phẩm</div>
                  </div> */}
                  <img loading="lazy" src={image_url} alt="Product" className="mt-7 w-full max-md:max-w-full" />
                </section>
              </div>
              <aside className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                <h1 className="text-3xl font-black text-black max-md:max-w-full">{name}</h1>
                <div className="mt-8 text-2xl font-medium text-neutral-400 max-md:max-w-full">{price} đ</div>
                <div className="flex gap-5 mt-7 max-md:flex-wrap">
                  <span className="flex items-center text-orange-600">
                    {Array(rating)
                      .fill()
                      .map((i) => (
                        <FaStar />
                      ))}
                  </span>
                  <span className="text-yellow-950 hover:underline hover:cursor-pointer">
                    {" "}
                    {rating} Ratings
                  </span>
                </div>
                <div className="mt-10 text-sm text-black max-md:max-w-full">
                  <br />
                  Bánh hạt điều đồng tiền &quot;Cashew Coin Cakes&quot; là sự kết hợp tinh tế giữa hương vị thơm ngon của hạt điều tươi và vị bánh mềm mịn, tạo nên một sản phẩm ăn vặt hấp dẫn và độc đáo.
                  <br />
                </div>
                <div className="mt-9 text-sm text-neutral-400 max-md:max-w-full">Kích cỡ</div>
                <div className="justify-center self-start px-6 py-2.5 mt-6 text-sm text-center text-white whitespace-nowrap bg-yellow-600 rounded-md max-md:px-5">{category}</div>
                <div className="mt-6 text-sm text-neutral-400 max-md:max-w-full">Hương vị</div>
                <div className="justify-center self-start px-9 py-2.5 mt-5 text-sm text-center text-white bg-yellow-600 rounded-md max-md:px-5">Truyền thống</div>
                <button
                  className="px-9 py-2.5 mt-9 bg-white duration-200 ease-linear hover:bg-red-500 text-yellow-600 hover:text-white border border-yellow-600 w-1/2 rounded-md py-1"
                  onClick={() => addToCartHandler(product)}
                >
                  Thêm vào giỏ hàng
                </button>
              </aside>
            </div>
          </div>
          {/* <div className="mt-5 max-w-full w-[577px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/909c543d141f1d74d48f1c0d140afe43602cacc28cb51ed53f3255ccdc8d08a7?apiKey=25dae93728374761a999bafcb7d5e663&" alt="Additional product 1" className="shrink-0 max-w-full aspect-square w-[178px] max-md:mt-5" />
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/971c35bd8b2484ad87c08f06c454a10c355033c6484644f733d6a34de9c5e043?apiKey=25dae93728374761a999bafcb7d5e663&" alt="Additional product 2" className="shrink-0 max-w-full aspect-square w-[178px] max-md:mt-5" />
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f72efc74964ff86e5d449188c980a45b971b0fd14468788581fae6e2b9ebd18f?apiKey=25dae93728374761a999bafcb7d5e663&" alt="Additional product 3" className="shrink-0 max-w-full aspect-square w-[178px] max-md:mt-5" />
              </div>
            </div>
          </div> */}
        </section>
      </main>
      <div className="px-12 mt-9 mt-10 flex flex-col items-center py-20 w-full bg-white max-md:max-w-full rounded-md max-w-[1200px]">
        <section className="text-3xl font-bold text-black max-md:mt-10 max-md:max-w-full">Mô tả</section>
        <article className="mt-9 text-xl text-black max-md:max-w-full">
          Sự pha trộn hoàn hảo giữa hương vị thơm ngon của hạt điều tươi ngon và vị muối hòa quyện tạo nên sản phẩm hạt điều rang muối của chúng tôi.
          <br />
          <br />
          <span className="font-bold">Đặc điểm nổi bật:</span>
          <br />
          <ul>
            <li>1. Hạt điều Tươi Nguyên Chất: Chúng tôi chỉ sử dụng hạt điều nguyên chất từ các vùng trồng uy tín, đảm bảo chất lượng và hương vị tốt nhất cho sản phẩm của bạn.</li>
            <li>2. Rang Tỉ mỉ: Mỗi hạt điều được rang tỉ mỉ, giữ lại độ giòn và hương vị tự nhiên của chúng.</li>
            <li>3. Muối Tinh Khiết: Sử dụng muối tinh khiết nhất để tạo ra lớp vị muối đậm đà, hòa quyện hoàn hảo với hạt điều, mang lại trải nghiệm ẩm thực tuyệt vời cho người tiêu dùng.</li>
            <li>4. Thực Phẩm An Toàn: Sản phẩm được sản xuất theo quy trình nghiêm ngặt, đảm bảo an toàn vệ sinh thực phẩm cho người tiêu dùng.</li>
            <li>5. Hướng Dẫn Sử Dụng: Thích hợp để thưởng thức trực tiếp, hoặc kết hợp với các món nhậu, các bữa tiệc, hoặc làm quà biếu ý nghĩa.</li>
            <li>6. Bao Bì Bảo Quản: Đóng gói trong túi zip tiện lợi, giúp bảo quản sản phẩm lâu dài và giữ cho hạt điều luôn giòn ngon.</li>
          </ul>
          <br />
          <span className="font-bold">Thông tin thêm:</span>
          <br />
          <br />
          Trọng lượng: 500g/túi
          <br />
          Hạn sử dụng: 6 tháng kể từ ngày sản xuất
          <br />
          Xuất xứ: Việt Nam
          <br />
          <br />
          <span className="font-bold">Cam kết chất lượng:</span>
          <br />
          Sản phẩm &quot;Salty Crunch&quot; của chúng tôi cam kết mang lại cho quý khách hàng trải nghiệm hương vị đặc trưng của hạt điều nguyên chất, kết hợp với vị muối đậm đà, đem đến sự hài lòng và thú vị cho mọi bữa tiệc và những khoảnh khắc thư giãn của bạn.
          <br />
          <br />
          <span className="italic font-light">Hãy đặt mua ngay để trải nghiệm sự ngon miệng của &quot;điều bình minh&quot;!</span>
        </article>
        </div>

      {/* product description */}
      {/* <div className=" bg-white rounded-md p-3 space-y-2">
        <p className="text-1xl font-medium">Thông tin của sản phẩm {name}</p>
        <p className="text-sm">{description}</p>
      </div> */}
      <FeaturedProduct />
    </div>
  );
};
