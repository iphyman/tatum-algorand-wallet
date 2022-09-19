import { useEffect, useState } from "react";
import { css } from "styled-components/macro";

/**
 * Define your breakpoints
 * using some Bootstrap standard
 */
export const breakpoints = {
  mobile: 479,
  mobileL: 575,
  tablet: 767,
  tabletL: 991,
  laptop: 1023,
  laptopML: 1100,
  laptopM: 1279,
  laptopL: 1439,
  desktop: 2560,
};

export type BreakPoints = typeof breakpoints;

export type Sizes = keyof BreakPoints;

export type MediaServiceType = {
  atLeastDesktop: (...args: any[]) => any;
  atLeastLaptop: (...args: any[]) => any;
  atLeastLaptopL: (...args: any[]) => any;
  atLeastLaptopML: (...args: any[]) => any;
  atLeastLaptopM: (...args: any[]) => any;
  atLeastMobile: (...args: any[]) => any;
  atLeastMobileL: (...args: any[]) => any;
  atLeastTablet: (...args: any[]) => any;
  atLeastTabletL: (...args: any[]) => any;
  desktop: (...args: any[]) => any;
  laptop: (...args: any[]) => any;
  laptopL: (...args: any[]) => any;
  laptopM: (...args: any[]) => any;
  mobile: (...args: any[]) => any;
  mobileL: (...args: any[]) => any;
  tablet: (...args: any[]) => any;
  tabletL: (...args: any[]) => any;
};

// Iterate through the breakpoints and create a media template
const media = Object.keys(breakpoints).reduce((acc, label) => {
  (acc as any)[label as keyof Sizes] = (
    literals: TemplateStringsArray,
    ...args: any[]
  ) =>
    css`
      @media (max-width: ${breakpoints[label as Sizes]}px) {
        // @ts-ignore
        ${css(literals, ...args)}
      }
    `;
  (acc as any)[
    "atLeast" + label[0].toUpperCase() + label.slice(1, label.length)
  ] = (literals: TemplateStringsArray, ...args: any[]) => {
    return css`
      @media (min-width: ${breakpoints[label as Sizes] + 1}px) {
        // @ts-ignore
        ${css(literals, ...args)}
      }
    `;
  };

  return acc;
}, {});

export function useMedia(size: Sizes): boolean {
  // eslint-disable-next-line
  const getSize = () => {
    if (window.innerWidth <= breakpoints[size]) {
      return true;
    }

    return false;
  };

  const [isSize, setIsSize] = useState(getSize());

  useEffect(() => {
    const handleResize = () => {
      setIsSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize]);

  return isSize;
}

export default media as MediaServiceType;
