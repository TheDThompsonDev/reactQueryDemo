import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import ListOfProducts from './components/ListOfProducts';
import styles from './App.module.scss';
import Product from './components/Product';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GetProducts />
    </QueryClientProvider>
  );
}

const GetProducts = () => {
  const [productId, setProductId] = useState(-1);
  const { isLoading, data, isError, isFetching } = useQuery(['repoData'], () =>
    axios.get('https://fakestoreapi.com/products').then((res) => res.data)
  );

  if (isLoading) return 'Loading...';
  if (isError) return 'Error! Something messed up!';

  const listOfProducts = (data) => (
    <div>
      <div className={styles.mainContainer}>
        {data.map((product, index) => (
          <div key={index}>
            <ListOfProducts
              picture={product.image}
              price={product.price}
              title={product.title}
              id={product.id}
              setProductId={setProductId}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const selectedProduct = Array.isArray(data) ? data.find((product) => product.id === productId) : null;

  const product = () => (
    <div>
      <a href="#" onClick={() => setProductId(-1)}>
        Back
      </a>
      {selectedProduct && (
        <Product
          picture={selectedProduct.image}
          price={selectedProduct.price}
          title={selectedProduct.title}
          id={selectedProduct.id}
        />
      )}
      <div>{isFetching ? 'Updating...' : ''}</div>
      <div>
        <ReactQueryDevtools initialIsOpen />
      </div>
    </div>
  );

  return (
    <div>
      {Array.isArray(data) && productId === -1 ? (
        listOfProducts(data)
      ) : (
        selectedProduct ? product() : null
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
