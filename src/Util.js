export const humanize = (shelf) =>
    shelf.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())