import { useQuery, keepPreviousData } from '@tanstack/react-query';

const fetchMenu = async (page, limit = 8, searchQuery) => {
  const urlMenu = new URL('https://seemly-hail-eel.glitch.me/menus');
  urlMenu.searchParams.append('page', page);
  urlMenu.searchParams.append('limit', limit);

  if (searchQuery) {
    urlMenu.searchParams.append('search', searchQuery);
  }

  const response = await fetch(urlMenu);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const dataMenu = await response.json();
  const totalPages = Math.ceil(dataMenu.totalData / limit);

  const menu = dataMenu.data || [];

  return { menu, totalPages };
};

const useFetchMenu = (page, searchQuery) => {
  return useQuery({
    queryKey: ['menu', page, searchQuery],
    queryFn: () => fetchMenu(page, undefined, searchQuery),
    placeholderData: keepPreviousData,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // Data dianggap fresh selama 5 menit
  });
};

export default useFetchMenu;
