"use client";
import styles from "./Carousel.module.scss";

import { AspectRatio } from "@mui/joy";
import { PostikImage } from "../Postiki/postikiApiSlice";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { memo } from "react";
import Image from "next/image";

const Carousel = (props: { imagesUrls: PostikImage[] }) => {
  const settings = {
    accessibility: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {props.imagesUrls.map((item: PostikImage, index: number) => (
        <AspectRatio key={index} ratio="4/4">
          <img
            src={item.URL}
            loading="lazy"
            alt=""
            width="200"
            height="200"
            style={{ width: "100%", height: "100%" }}
          />
        </AspectRatio>
      ))}
    </Slider>
  );
};

export default memo(Carousel);
