import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams(); // URL에서 ID를 가져옵니다
    const [good, setGood] = useState([]);
    useEffect(() => {
        const fetchGood = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/goods/product/${id}/`, {
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
                setGood(data);
            } catch (error) {
                console.error("Failed to fetch product details", error);
            }
        };

            fetchGood();

    }, [id]);

    return (
        <div>
            <h1>{good.name}</h1>

        </div>
    );
};

export default ProductDetail;
