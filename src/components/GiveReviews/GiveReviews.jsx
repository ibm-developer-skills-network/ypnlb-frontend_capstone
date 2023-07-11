import React, { useState, useEffect } from 'react';
import './GiveReviews.css';
import { useNavigate } from 'react-router-dom';

const GiveReviews = () => {
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
    });

    const [submitted, setSubmitted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const storedFormData = localStorage.getItem('reviewFormData');
        if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
        setSubmitted(true);
        }
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleRatingChange = (rating) => {
        setFormData({
        ...formData,
        rating: rating
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.review && formData.rating > 0) {
        localStorage.setItem('reviewFormData', JSON.stringify(formData));
        setSubmitted(true);
        setShowWarning(false);
        } else {
        setShowWarning(true);
        }
    };

    if (submitted) {
        return (
        <div className="review-box">
            <h2>Your Review is been Recorded!</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Review:</strong> {formData.review}</p>
            <p><strong>Rating:</strong> {formData.rating} stars</p>
        </div>
        );
    }

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <h2>Give Your Review</h2>
        {showWarning && <p className="warning">Please fill out all fields.</p>}
            <div>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <label htmlFor="review">Review:</label>
            <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <label htmlFor="rating">Rating:</label>
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                    <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={formData.rating === rating}
                    onChange={() => handleRatingChange(rating)}
                    />
                    {/* <span className="star">&#9733;</span> */}
                </label>
                ))}
                <br/>
            </div>
                0 → 5
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default GiveReviews;
