
import { useEffect, useRef, useState } from "react";
import {
  getCharacters,
  filterCharacters,
  Character,
  CharacterFilters,
} from "../services/api";

/* debounce hook to delay search input */
function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/* main hook */
export function useCharacters() {
  // state for character list
  const [characters, setCharacters] = useState<Character[]>([]);

  // pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // loading states
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // error state
  const [error, setError] = useState<string | null>(null);

  // filters and search
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [search, setSearch] = useState("");

  // debounced search value
  const debouncedSearch = useDebounce(search, 500);

  // ref to prevent duplicate requests
  const isRequesting = useRef(false);

  /* fetch characters function */
  const fetchCharacters = async ({
    pageNum = 1,
    isLoadMore = false,
    isRefresh = false,
  }: {
    pageNum?: number;
    isLoadMore?: boolean;
    isRefresh?: boolean;
  }) => {
    // prevent duplicate calls
    if (isRequesting.current) return;

    // prevent loading more when no more data
    if (!hasMore && isLoadMore) return;

    try {
      isRequesting.current = true;

      // set loading states
      if (isLoadMore) setIsFetchingMore(true);
      else setLoading(true);

      let data;

      // merge filters with search
      const activeFilters = {
        ...filters,
        ...(debouncedSearch ? { name: debouncedSearch } : {}),
      };

      const hasFilters = Object.keys(activeFilters).length > 0;

      // call filter api when filters exist
      if (hasFilters) {
        data = await filterCharacters(activeFilters);

        setCharacters(data);
        setHasMore(false);
      } else {
        const res = await getCharacters(pageNum);

        if (isRefresh || pageNum === 1) {
          setCharacters(res.items);
        } else {
          setCharacters(prev => [...prev, ...res.items]);
        }

        setHasMore(pageNum < res.meta.totalPages);
        setPage(pageNum);
      }

      setError(null);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
      isRequesting.current = false;
    }
  };

  /* load more for infinite scroll */
  const loadMore = () => {
    if (!hasMore || isFetchingMore) return;
    fetchCharacters({ pageNum: page + 1, isLoadMore: true });
  };

  /* pull to refresh */
  const refresh = () => {
    setHasMore(true);
    fetchCharacters({ pageNum: 1, isRefresh: true });
  };

  /* apply filters */
  const applyFilters = (newFilters: CharacterFilters) => {
    setFilters(newFilters);
  };

  /* clear filters and search */
  const clearFilters = () => {
    setFilters({});
    setSearch("");
  };

  /* initial fetch */
  useEffect(() => {
    fetchCharacters({ pageNum: 1 });
  }, []);

  /* refetch when filters or search change */
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchCharacters({ pageNum: 1 });
  }, [filters, debouncedSearch]);


  return {
    characters,
    loading,
    error,
    isFetchingMore,
    hasMore,
    loadMore,
    refresh,
    applyFilters,
    clearFilters,
    setSearch,
  };
}