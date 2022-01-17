import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_ITEMS = [
  {
    id:'p1',
    price:6,
    name:'My Book1',
    description:'First Book'
  },
  {
    id:'p2',
    price:8,
    name:'My Book2',
    description:'Second Book'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_ITEMS.map(product => (
              <ProductItem
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              description={product.description}
            />
          ))
        }
       
      </ul>
    </section>
  );
};

export default Products;
