import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { FaSearch, FaFilter, FaShoppingCart, FaStar, FaEye } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCart();

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'wall-art', label: 'Wall Art' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'decorative', label: 'Decorative' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'garden', label: 'Garden' },
    { value: 'religious', label: 'Religious' },
    { value: 'other', label: 'Other' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: '-name', label: 'Name: Z to A' },
    { value: 'averageRating', label: 'Highest Rated' },
  ];

  useEffect(() => {
    loadProducts();
  }, [filters, pagination.currentPage]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        ...filters,
        page: pagination.currentPage,
        limit: 12,
      };

      const response = await productsAPI.getAll(params);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Load products error:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId, 1);
    if (!result.success) {
      alert(result.error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? 'star filled' : 'star'}
        />
      );
    }
    return stars;
  };

  if (loading && products.length === 0) {
    return (
      <div className="products-container">
        <div className="loading-spinner">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Wooden Art Products</h1>
        <p>Discover beautiful handcrafted wooden art pieces</p>
      </div>

      {/* Search and Filters */}
      <div className="products-controls">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>

        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range:</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="price-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select
              value={`${filters.sort}${filters.order === 'asc' ? '' : '-'}`}
              onChange={(e) => {
                const value = e.target.value;
                const isDesc = value.startsWith('-');
                handleFilterChange('sort', isDesc ? value.slice(1) : value);
                handleFilterChange('order', isDesc ? 'desc' : 'asc');
              }}
              className="filter-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.mainImage} alt={product.name} />
              <div className="product-actions">
                <Link to={`/product/${product._id}`} className="action-button view">
                  <FaEye />
                </Link>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="action-button cart"
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart />
                </button>
              </div>
              {product.stock === 0 && (
                <div className="out-of-stock">Out of Stock</div>
              )}
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              
              <div className="product-rating">
                {renderStars(product.averageRating)}
                <span className="rating-count">({product.totalReviews})</span>
              </div>

              <div className="product-price">
                <span className="current-price">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <p className="product-material">Material: {product.material}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
            disabled={!pagination.hasPrev}
            className="pagination-button"
          >
            Previous
          </button>
          
          <span className="pagination-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
            disabled={!pagination.hasNext}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      {/* No Products Message */}
      {products.length === 0 && !loading && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default Products; 