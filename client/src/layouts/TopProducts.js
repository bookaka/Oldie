import React from "react";
import ProductShow from "../components/ProductShow";

import IP12PM128GB from "../assets/images/ip12pm128.png";
import P1 from "../assets/images/p1.png";
import MORE from "../assets/svg/more.svg";
import Button from "../components/Button";

const Product_Items = [
  {
    name: "Iphone 12promax 128GB",
    value: "21",
    seller: P1,
    image: IP12PM128GB,
  },
  {
    name: "Iphone 12promax 128GB",
    value: "21",
    seller: P1,
    image: IP12PM128GB,
  },
  {
    name: "Iphone 12promax 128GB",
    value: "21",
    seller: P1,
    image: IP12PM128GB,
  },
  {
    name: "Iphone 12promax 128GB",
    value: "21",
    seller: P1,
    image: IP12PM128GB,
  },
];

const TopProducts = () => {
  return (
    <section className="h-[1274px]">
      <div className="wrapper text-center mt-[80px]">
        <div>
          <h1 className="font-secondaryFont font-bold text-[43px] text-[#212121]">
            Sản phẩm nổi bật
          </h1>
        </div>
        <div className="mt-[80px]">
          <ProductShow value="star">{Product_Items}</ProductShow>
        </div>
        <div className="mt-[80px]">
          <ProductShow value="star">{Product_Items}</ProductShow>
        </div>
        <div className="mt-[80px] flex justify-center items-center">
          <Button className="bg-linearBtnBg w-[198px] h-[60px] text-[18px] font-secondaryFont font-bold text-white">
            Xem tất cả
            <img src={MORE} alt="More"></img>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;
