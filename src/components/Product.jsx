import React from "react";
import styles from "./singleProduct.module.scss";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Product = ({ id }) => {
  const itemId = id.toString();

  const { isLoading, data, isError } = useQuery(['repoData', itemId], () =>
    axios.get(`https://fakestoreapi.com/products/${itemId}`).then((res) => res.data)
  );

  if (isLoading) return 'Loading...';
  if (isError) return 'Error! Something messed up!';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div>{data.title}</div>
      <div>{data.price}</div>
      <div>{data.description}</div>
      <img src={data.image} alt="randomly generated image of a product" />
      </
      div>
    </div>
  );
};

export default Product;
