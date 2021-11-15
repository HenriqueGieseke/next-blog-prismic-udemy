import { render } from '@testing-library/react';
import Home from '../../pages';

describe('Home page', () => {
  test('renders correctly', () => {
    const { getByText, getByAltText, debug } = render(<Home />);

    //mostra o componente renderizado no console
    debug();

    expect(getByText('Olá Dev!')).toBeInTheDocument();
    expect(getByAltText('Home image')).toBeInTheDocument();
  });
});
