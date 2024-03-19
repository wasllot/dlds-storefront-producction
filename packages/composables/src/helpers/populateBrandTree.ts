import {AgnosticCategoryTree} from '@vue-storefront/core';

const slugify = (url) => {
  const lastPart = url.substring(url.lastIndexOf('/') + 1);
  return lastPart.match(/^[0-9]+-(.*)$/)[1];
};

const treeObject = (brand, items) : AgnosticCategoryTree => {
  return {
    label: brand.name,
    slug: brand.slug,
    items: items,
    isCurrent: false,
    count: brand.cantidad_productos
  };
};

const populateSecondLevel = (brands: Array<any>) : AgnosticCategoryTree[] => {
  return brands.map((category): AgnosticCategoryTree => (
    treeObject(category, null)
  ));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateBrandTree = (brands: any) : AgnosticCategoryTree => {
  
  if(brands){

    const children = brands.map((brand: any) : AgnosticCategoryTree => (
      treeObject(brand.brand, brand.children ? populateSecondLevel(brand.children) : null)
    ));
  
    return treeObject(brands, children);
  }

};

export default populateBrandTree;
