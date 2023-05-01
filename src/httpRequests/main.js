import axios from 'axios';

axios.defaults.baseURL = 'https://642566eb7ac292e3cfff9ed9.mockapi.io/items';

export const requestConfig = {
  limit: 4,
};

export async function requestForPizzaList({ activeSort, order, category, page, search }) {
  const { limit } = requestConfig;
  const ctg = category > 0 ? `&category=${category}` : '';
  const title = search ? `&title=${search}` : '';

  const resp = await axios.get(
    `?page=${page}&limit=${limit}&sortBy=${activeSort}&order=${order}${title}${ctg}`,
  );

  const total = await axios.get(`?sortBy=${activeSort}&order=${order}${title}${ctg}`);
  const totalPages = Math.ceil(total.data.length / limit);

  return { resp, totalPages };
}
