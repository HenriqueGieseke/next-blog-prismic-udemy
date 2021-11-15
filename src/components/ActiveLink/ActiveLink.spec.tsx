import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

//imita um módulo
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('ActiveLink component', () => {
  test('renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a href="">Home</a>
      </ActiveLink>
    );

    //apos renderizar o componente se espera que a tela tenho o texto home no Documento
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  //it para completar uma frase que descreve o teste com clareza
  it('adds active class if the link is currently active', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a href="">Home</a>
      </ActiveLink>
    );

    expect(getByText('Home')).toHaveClass('active');
  });
});
