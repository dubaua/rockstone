import Vue from "vue";

export const numberWithSpaces = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const declOfNum = (n, titles) =>
  titles[ // eslint-disable-next-line no-nested-ternary
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
  ];

export const upperCasefirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const EventBus = new Vue();

export function addScript({ src, integrity, crossorigin, callback }) {
  const scriptElement = document.createElement("script");
  scriptElement.onload = function() {
    if (callback) callback();
  };
  scriptElement.setAttribute("src", src);
  scriptElement.setAttribute("integrity", integrity);
  scriptElement.setAttribute("crossorigin", crossorigin);
  document.body.appendChild(scriptElement);
}
