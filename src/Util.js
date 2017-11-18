export const humanize = (shelf) =>
    // https://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form
    shelf.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

export const getSearchTerm = () =>
    location.search.split('&').filter((t) => t.indexOf('q=') >= 0).map((t) => t.split('=')[1])[0] || '';