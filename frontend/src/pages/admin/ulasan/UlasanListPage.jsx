// Admin - Review List Page
import { useState, useEffect } from 'react';

export default function UlasanListPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // TODO: Fetch all reviews dari API
  }, []);

  return (
    <div className="ulasan-list-page">
      <h1>Customer Reviews</h1>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.product_name}</h3>
              <span className="rating">
                {'⭐'.repeat(review.rating)}
              </span>
            </div>
            <p><strong>Customer:</strong> {review.customer_name}</p>
            <p className="comment">{review.comment}</p>
            <small>Date: {new Date(review.created_at).toLocaleDateString()}</small>
            <div className="review-actions">
              <button>Approve</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
