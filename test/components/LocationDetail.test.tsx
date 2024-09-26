import { render, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo-client';
import LocationDetail from '../../app/pages/location/[id]';

describe('LocationDetail', () => {
  it('renders location name', async () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <LocationDetail />
      </ApolloProvider>
    );
    await waitFor(() => getByText('Ubicación:'));
    const locationName = getByText('Ubicación:');
    expect(locationName).toBeInTheDocument();
  });

  it('renders location details', async () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <LocationDetail />
      </ApolloProvider>
    );
    await waitFor(() => getByText('Tipo:'));
    const locationType = getByText('Tipo:');
    expect(locationType).toBeInTheDocument();
  });
});