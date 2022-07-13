import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../components/product-card';
import Search from '../components/search';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/products').then(({ data: { products } }) => {
      setProducts(products);
    });
  }, []);

  const doSearch = term => setFilter(term);

  return (
    <main className="my-8">
      <Search doSearch={doSearch} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">{products.length} Products</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products
            .filter(item => item.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
            .map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </div>
    </main>
  );
}
