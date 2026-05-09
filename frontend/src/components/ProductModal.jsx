import { useEffect, useState } from 'react';

function ProductModal({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-body">
          <img id="modalImage" src={product.image} alt={product.name} />
          <div className="modal-details">
            <h3 id="modalTitle">{product.name}</h3>
            <p id="modalDescription">{product.description}</p>
            <p className="price" id="modalPrice">
              LKR {product.price.toFixed(2)}
            </p>
            <div className="quantity-selector">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              />
              <button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
            </div>
            <button className="btn btn-primary" onClick={() => onAdd(product.id, quantity)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
