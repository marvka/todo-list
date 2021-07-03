"use strict";
export const wipeObj = (obj) => {
  for (const prop of Object.getOwnPropertyNames(obj)) {
    delete obj[prop];
  }
};
