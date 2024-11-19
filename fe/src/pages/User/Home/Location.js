import React from "react";

export const Location = () => {

  return (
    <div className="pt-28 pb-20 px-36">
      <ul className="flex flex-wrap justify-around items-center w-full">
        <div className="flex flex-col items-center px-100 mt-100 w-full bg-yellow-500/10 max-md:max-w-full rounded-md">
          <h2 className="text-center mb-10 mt-[-10] text-4xl font-bold text-black-200 pt-10">LIÊN HỆ</h2>
          <main className="flex flex-col items-center py-10 mt-0 w-full bg-white max-md:max-w-full rounded-md max-w-[1200px]">
          <section className="flex flex-col px-5 mt-5 w-full max-w-[1165px] max-md:max-w-full">
            <div className="self-center w-full max-w-[1071px] max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
                  <section className="flex flex-col grow text-xl text-neutral-900 max-md:mt-5 max-md:max-w-full">
                    <iframe
                      className="my-iframe-class"
                      title="map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1104681388733!2d108.23816041077595!3d16.059756339627207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f00c05eed%3A0xb72c8e84c343e282!2zMzY1UitWOUcsIDEwMUIgTMOqIEjhu691IFRyw6FjLCBQaMaw4bubYyBN4bu5LCBTxqFuIFRyw6AsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1695648678670!5m2!1svi!2s"
                      width="100%"
                      height="450"
                      style={{ border: "0" }}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </section>
                </div>
                <aside className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                  <h1 className="mt-1 mb-4 text-xl font-black text-black max-md:max-w-full">Địa chỉ</h1>
                  <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full"> Số 12, đường DC3, phường Sơn Kỳ, quận Tân Phú, TP.HCM</div>
                  <h1 className="mt-1 mb-4 text-xl font-black text-black max-md:max-w-full">Thông tin</h1>
                  <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full">Phone : 0793 910 326</div>
                  <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full">Email : Dieubinhminh2024@gmail.com</div>
                  <h1 className="mt-1 mb-4 text-xl font-black text-black max-md:max-w-full">Giờ hoạt động</h1>
                  <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full">Mon – Sat : 9:00 AM - 7:00 PM</div>
                  <div className="mt-1 mb-4 text-l text-black-200 max-md:max-w-full">Sunday : 9:00 AM - 6:00 PM</div>
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
