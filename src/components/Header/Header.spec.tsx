import { render, screen } from '@testing-library/react';
import { Header } from '.';

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

describe('Header component', () => {
  test('renders correctly', () => {
    const { getByText, getByAltText } = render(<Header />);

    //cria pagina playground para explorar os elementos do componente, mostra
    //como seleciona-los e mostra possibilidades de testes
    screen.logTestingPlaygroundURL();

    //apos renderizar o componente se espera que a tela tenho o texto home e posts no Documento
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
    expect(getByAltText('DevNews!')).toBeInTheDocument();
  });
});
