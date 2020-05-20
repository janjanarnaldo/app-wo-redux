'use strict';

const _Pagination = ({
  totalItems = 0,
  itemsPerPage = 3,
  currentPage = 1,
  setCurrentPage = () => {},
}) => {
  const { createElement: e, Fragment } = React;
  const { addClass } = commonUtilities;

  const renderPage = page => e('a', { key: page, onClick: () => setCurrentPage(page) }, page);
  const render = () => {
    const prev = e('a', { onClick: () => setCurrentPage(currentPage - 1) }, 'Previous');
    const next = e('a', { onClick: () => setCurrentPage(currentPage + 1) }, 'Next');
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1 || !totalItems) return null;
    
    return e(
      Fragment,
      null,
      currentPage !== 1 ? prev : null,
      [...Array(totalPages).keys()].map(page => renderPage(page + 1 ) ),
      currentPage !== totalPages ? next : null,
    );
  };

  return e(
    'div',
    addClass('Pagination__root'),
    render(),
  )
};
