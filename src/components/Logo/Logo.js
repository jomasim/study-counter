import React from "react";
import Link from "next/link";

import imgL1Logo from "../../assets/image/logo-main-green.png";
import imgL1LogoWhite from "../../assets/image/logo-main-green.png";

const Logo = ({ white, height, className = "", ...rest }) => {
  return (
    <Link href="/">
      <a className={`d-block ${className}`} {...rest}>
        {white ? (
          <img src={imgL1LogoWhite} alt="Study Counter" />
        ) : (
          <img src={imgL1Logo} alt="Study Counter" />
        )}
      </a>
    </Link>
  );
};

export default Logo;
