import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../css/home/GoodsMain.css';

const GoodsMain = () => {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/goods/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          console.error("Unauthorized access - Please log in");
          return;
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setGoods(data);
      } catch (error) {
        console.error("Failed to fetch goods list", error);
      }
    };

    fetchGoods();
  }, []);

  return (
    <div className="goods-container">
      <div className="goods-grid">
        {goods.map(good => (
          <div className="goods-item" key={good.id}>
            <Link to={`/goods/${good.id}`}>
              {good.images.length > 0 && (
                <img src={good.images[0].image_url} alt={good.name.name} />
              )}
              <h2>{good.name.name}</h2>
              <p>Model Number: {good.name.model_number}</p>
              <p>즉시 구매가: {good.price}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="top100-container">
        <h2>최근 좋아요 TOP100</h2>
        <div className="top100-grid">
          {goods.slice(0, 5).map(good => (
            <div className="top100-item" key={good.id}>
              <Link to={`/goods/${good.id}`}>
                {good.images.length > 0 && (
                  <img src={good.images[0].image_url} alt={good.name.name} />
                )}
                <h3>{good.name.name}</h3>
                <p>{good.name.model_number}</p>
                <p>즉시 구매가: {good.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoodsMain;
