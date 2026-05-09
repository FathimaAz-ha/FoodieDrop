function ProductCard({ product, onOpen, onAdd }) {
  return (
    <div className="product-card" onClick={() => onOpen(product)}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">LKR {product.price.toFixed(2)}</span>
          <button
            className="product-btn"
            onClick={(event) => {
              event.stopPropagation();
              onAdd(product.id);
            }}
          >
            <i className="fas fa-shopping-cart" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
