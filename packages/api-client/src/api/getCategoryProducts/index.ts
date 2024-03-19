import {facetParams} from '../../helpers/facetParams';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCategoryProducts(context, params) {
  if (params.input.type && params.input.type === 'instant-search') {
    const url = new URL(context.config.api.url + params.lang + '/rest/productSearch');
    url.searchParams.set('iso_currency', params.currency);
    url.searchParams.set('s', params.input.term);
    url.searchParams.set('resultsPerPage', '10');
    url.searchParams.set('page', params.input.page);
    url.searchParams.set('tipo', 'instant');

    const { data } = await context.client.get(url.href);
    return data;

  }else if (params.input.type && params.input.type === 'search') {
    const url = new URL(context.config.api.url + params.lang + '/rest/productSearch');
    url.searchParams.set('iso_currency', params.currency);
    url.searchParams.set('s', params.input.term);
    url.searchParams.set('page', params.input.page);
    url.searchParams.set('resultsPerPage', '10');


    const { data } = await context.client.get(url.href);
    return data;

  }else if (params.input.type && params.input.type === 'featured') {
    const url = new URL(context.config.api.url + params.lang + '/rest/productsFeatured');
    url.searchParams.set('iso_currency', params.currency);
    url.searchParams.set('featured', params.input.featured?params.input.featured:1);
    url.searchParams.set('bestSelling', params.input.bestSelling?params.input.bestSelling:1);
    url.searchParams.set('resultsPerPage', params.input.resultsPerPage?params.input.resultsPerPage:20);

    const { data } = await context.client.get(url.href);
    return data;

  }else if(params.input.type && params.input.type === 'discount-products'){

    const url = new URL(context.config.api.url + params.lang + '/rest/productDiscount');
    url.searchParams.set('iso_currency', params.currency);
    url.searchParams.set('s', params.input.term);
    url.searchParams.set('page', params.input.page);

    const { data } = await context.client.get(url.href);
    return data;

  }else if(params.input.type && params.input.type === 'latest-products'){

    const url = new URL(context.config.api.url + params.lang + '/rest/latestProducts');
    url.searchParams.set('iso_currency', params.currency);
    url.searchParams.set('s', params.input.term);
    url.searchParams.set('page', params.input.page);

    const { data } = await context.client.get(url.href);
    return data;

  }else if(params.input.type && params.input.type === 'brands') {
    const url = new URL(context.config.api.url + params.lang + '/rest/brandProducts');
    url.searchParams.set('iso_currency', params.currency);
    const facetsUrl = facetParams(params.input.filters);

    url.searchParams.set('slug', params.input.slug);
    url.searchParams.set('q', facetsUrl);
    url.searchParams.set('page', params.input.page);
    url.searchParams.set('with_all_images', '1');
    url.searchParams.set('with_category_tree', '1');
    url.searchParams.set('resultsPerPage', params.input.resultsPerPage?params.input.resultsPerPage:'');

    const { data } = await context.client.get(url.href);
    return data;
  }else {
    const url = new URL(context.config.api.url + params.lang + '/rest/categoryProducts');
    url.searchParams.set('iso_currency', params.currency);
    const facetsUrl = facetParams(params.input.filters);

    url.searchParams.set('slug', params.input.categorySlug);
    url.searchParams.set('q', facetsUrl);
    url.searchParams.set('page', params.input.page);
    url.searchParams.set('with_all_images', '1');
    url.searchParams.set('with_category_tree', '1');
    url.searchParams.set('resultsPerPage', params.input.resultsPerPage?params.input.resultsPerPage:'');

    const { data } = await context.client.get(url.href);
    return data;
  }
}

