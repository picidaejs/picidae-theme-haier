/**
 * @file: style
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
import React from 'picidae/exports/react'
import * as p from 'polished'


export default
({
  copyrightColor = 'rgba(255, 255, 255, .4)',
  footerBgColor = '#808080',
  // footerBgColor = '#218080',
  // themeColor = '#99424f',
  themeColor = '#218080',
  loadingColor = p.complement(themeColor),
  bodyColor = '#393939'
}) => {
  const dThemeColor = p.darken(0, themeColor)
  const lThemeColor = p.lighten(.1, themeColor)
  const oThemeColor = p.opacify(.3, themeColor)

  return `
footer .copyright {
  color: ${copyrightColor}
}
footer.nav-footer {
  background-color: ${footerBgColor}
}
.showcaseSection .prose h1,
.productShowcaseSection h2,
nav.toc .toggleNav ul li a.navItemActive,
.container .wrapper h3,
.container .wrapper h2,
.homeContainer,
h1, h2, h3, h4,
a,
.container .wrapper h4,
nav.toc .toggleNav ul li a:hover, nav.toc .toggleNav ul li a:focus {
  color: ${themeColor}
}
body {
  color: ${bodyColor}
}
blockquote {
  border-left-color: ${p.lighten(.43, themeColor)};
  background-color: ${p.lighten(.52, themeColor)};
}
code {
  box-shadow: 2px 0 ${p.lighten(.53, themeColor)}, -2px 0 ${p.lighten(.53, themeColor)};
  background-color: ${p.lighten(.53, themeColor)}
}
.fixedHeaderContainer,
.button:hover,
nav.toc .toggleNav .navGroup.navGroupActive h3,
.navigationSlider .slidingNav ul li > a:focus,
.navigationSlider .slidingNav ul li > a:hover,
.navigationSlider .slidingNav ul li > a,
.mainContainer .wrapper .post .docPagination,
.navSearchWrapper .ds-dropdown-menu .algolia-docsearch-suggestion--category-header,
.navSearchWrapper .ds-dropdown-menu .algolia-docsearch-suggestion--category-header .algolia-docsearch-suggestion--highlight,
ul#languages-dropdown-items {
  background-color: ${themeColor}
}
.navigationSlider .slidingNav ul {
  background-color: ${dThemeColor}
}
.highlightBackground {
  background-color: ${oThemeColor}
}
.button {
  color: ${themeColor};
  border-color: ${themeColor};
}
pre code {
  border-left-color: ${themeColor};
}
.navSearchWrapper .ds-dropdown-menu .algolia-docsearch-suggestion--title .algolia-docsearch-suggestion--highlight,
.navSearchWrapper .ds-dropdown-menu .algolia-docsearch-suggestion--subcategory-column .algolia-docsearch-suggestion--highlight,
.darkBackground a,
.darkBackground code {
  color: ${lThemeColor}
}
@media only screen and (max-width: 735px) {
  ul#languages-dropdown-items,
  .reactNavSearchWrapper input#doc-search-input:focus, .reactNavSearchWrapper input#doc-search-input:active {
    background-color: ${themeColor}
  }
}

/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${loadingColor};

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${loadingColor}, 0 0 5px ${loadingColor};
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: ${loadingColor};
  border-left-color: ${loadingColor};
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`.trim()
}
