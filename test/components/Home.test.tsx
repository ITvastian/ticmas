import { render } from '@testing-library/react';
import Home from '../../app/page';

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });
});