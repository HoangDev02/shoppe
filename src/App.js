import React, {useEffect, useState} from 'react';
import test from './pages/test'


function App() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([])
  const fetchItems = async() => {
    const data = await fetch('/product');
    const items = await data.json();
    setItems(items)
  }

  return (
      <section>
      {
        items.map(item => (
          <div key={item._id}>
           {item.name}
           {item.price}
          </div>
        ))
      }
      </section>
  );
}

export default App;
