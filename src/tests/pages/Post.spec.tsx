import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Post, { getStaticProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'test-new-post',
  title: 'Title for new post',
  content: '<p>Post content</p>',
  updatedAt: '25 de dezembro de 2021',
};

jest.mock('../../services/prismic.ts');

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        isFallback: false,
      };
    },
  };
});

describe('Post page', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Post post={post} />);

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  test('loads initial data', async () => {
    //copia(mock) a função de pegar a info do prismic
    const getPrismicClientMocked = mocked(getPrismicClient);

    //copia o returno da função de request
    getPrismicClientMocked.mockReturnValueOnce({
      //mock a função e retorna uma promeça
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new Post' }],
          content: [{ type: 'heading2', text: '<p>Post content</p>' }],
        },
        last_publication_date: '12-25-2021',
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: 'test-new-post' },
    });

    //espera o retorno de um objeto
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'test-new-post',
            title: 'My new Post',
            content: '<p>Post content</p>',
            updatedAt: '25 de dezembro de 2021',
          },
        },
        revalidate: 43200,
      })
    );
  });
});
