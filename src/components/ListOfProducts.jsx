import styles from "./product.module.scss";

// eslint-disable-next-line react/prop-types
const ListOfProducts = ({ price, title, picture, id,setProductId }) => {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <img src={picture} alt="randomly generated image of a product" />
          <div>{price}</div>
          <div>{title}</div>
          <button key={id}>
                  <a
                    onClick={() => setProductId(id)}
                    href="#"
                  >
                    {title}
                  </a>

                </button>
        </div>
      </div>
    );
  };
export default ListOfProducts;