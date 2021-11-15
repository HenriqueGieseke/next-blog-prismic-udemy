import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

const posts = [
  {
    slug: 'test-new-post',
    title: 'Title for new post',
    excerpt: 'Post excerpt',
    updatedAt: '25 de dezembro de 2021',
  },
];

jest.mock('../../services/prismic.ts');

describe('Posts page', () => {
  test('renders correctly', () => {
    const { getByText, getByAltText } = render(<Posts posts={posts} />);

    expect(getByText('Title for new post')).toBeInTheDocument();
  });

  test('loads initial data', async () => {
    //copia(mock) a função de pegar a info do prismic
    const getPrismicClientMocked = mocked(getPrismicClient);

    //copia o returno da função de request
    getPrismicClientMocked.mockReturnValueOnce({
      //mock a função e retorna uma promeça
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'My new Post' }],
              content: [{ type: 'heading2', text: 'Post excerpt' }],
            },
            last_publication_date: '12-25-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    //espera o retorno de um objeto
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new Post',
              excerpt: 'Post excerpt',
              updatedAt: '25 de dezembro de 2021',
            },
          ],
        },
      })
    );
  });
});
