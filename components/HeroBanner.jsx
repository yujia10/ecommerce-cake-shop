import React from "react";
import Link from "next/link";

import {urlFor} from '../lib/client'

const HeroBanner = ({heroBanner}) => {
const {smallText, midText, largeText1, image, product, buttonText, desc} = heroBanner;
  return (
    <div className="hero-banner-container">
      <div>
        <p className="banner-small-text">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img src={urlFor(image)} alt="cupcake" className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
