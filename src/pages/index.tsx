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
  data: {
    title: string;
    description: string;
    url: string;
  };
  ts: number;
  ref: {
    id: string;
  };
};

type ApiResponseProps = {
  data: Image[];
  after: string;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({
    pageParam = null,
  }): Promise<AxiosResponse<ApiResponseProps>> => {
    console.log(pageParam);

    const response = await api.get(
      pageParam !== null ? `api/images?after=${pageParam}` : `api/images`
    );

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => {
      return lastPage.data.after ? lastPage.data.after : null;
    },
  });

  const formattedData = useMemo(() => {
    if (data) {
      if (data.pages) {
        data.pages
          .map(page => {
            if (page.data.data) {
              return page.data.data.map(image => {
                return {
                  title: image.data.title,
                  description: image.data.description,
                  url: image.data.url,
                  ts: image.ts,
                  id: image.ref.id,
                };
              });
            }
          })
          .flat();
      }
    }
    return null;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  // if (isLoading) {
  //   return <Loading />;
  // }

  // // TODO RENDER ERROR SCREEN
  // if (isError) {
  //   return <Error />;
  // }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
          />
        )}

        {isFetchingNextPage && 'Carregando ...'}
      </Box>
    </>
  );
}
