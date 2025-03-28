import 'dotenv/config';

class PageDTO {
  constructor(input, error) {
    this.status = error ? 'error' : 'success'; // sucess/error
    this.payload = input.docs || [];
    this.totalPages = input.totalPages || 0;
    this.prevPage = input.prevPage;
    this.nextPage = input.nextPage;
    this.hasPrevPage = input.hasPrevPage || false;
    this.hasNextPage = input.hasNextPage || false;

    const links = this.buildLink({
      prevPage: input.prevPage,
      nextPage: input.nextPage,
      limit: input.limit,
      sort: input.sort,
      query: input.query,
    });

    this.prevLink = links?.prevLink;
    this.nextLink = links?.nextLink;
  }

  buildLink({ prevPage, nextPage, limit, sort, query }) {
    const PORT = process.env.PORT || 8080;

    let baseLink = `http://localhost:${PORT}/api/products?page=:page`;

    if (limit) {
      baseLink += `&limit=${limit}`;
    }

    if (sort) {
      baseLink += `&sort=${sort}`;
    }

    if (query) {
      baseLink += `&query=${query}`;
    }

    return {
      prevLink: this.hasPrevPage ? baseLink.replace(':page', prevPage) : null,
      nextLink: this.hasNextPage ? baseLink.replace(':page', nextPage) : null,
    };
  }

  get() {
    return { ...this };
  }
}

export default PageDTO;
