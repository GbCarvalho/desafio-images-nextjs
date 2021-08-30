import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type ApiResponseProps = {
  data: Image[];
  after: string;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({
    pageParam = null,
  }): Promise<ApiResponseProps> => {
    const response = await api.get(`api/images`, {
      params: {
        after: pageParam,
      },
    });

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => {
      return lastPage.after ? lastPage.after : null;
    },
    staleTime: Infinity,
  });

  const formattedData = useMemo(() => {
    if (data) {
      return data.pages
        .map(page => {
          return page.data.map(image => {
            return image;
          });
        })
        .flat();
    }
    return null;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && !isFetchingNextPage && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            mt="10"
          >
            Carregar mais
          </Button>
        )}

        {isFetchingNextPage && isFetching && <Text mt="10">Carregando...</Text>}
      </Box>
    </>
  );
}
