import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  id: string;
  title: string;
  description: string;
  url: string;
  ts: number;
};

type ApiResponseProps = {
  data: Image[];
  after: string;
};

type fetchImagesParams = {
  pageParam?: number;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({
    pageParam = null,
  }: fetchImagesParams): Promise<AxiosResponse<ApiResponseProps>> => {
    const response = await api.get(
      pageParam !== null ? `api/images?after=${pageParam}` : `api/images`
    );

    return response;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, _) => {},
  });

  const formattedData = useMemo(() => {}, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
