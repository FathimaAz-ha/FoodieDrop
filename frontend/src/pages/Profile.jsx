function Profile() {
  return (
    <section className="profile-section">
      <div className="container profile-wrapper">
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            <i className="fas fa-user-circle" />
          </div>
          <h3>Jane Doe</h3>
          <p>foodielover@example.com</p>
          <div className="profile-menu">
            <button className="profile-btn active" type="button">Profile</button>
            <button className="profile-btn" type="button">Orders</button>
            <button className="profile-btn logout" type="button">Logout</button>
          </div>
        </aside>

        <div className="profile-content">
          <div className="profile-tab active">
            <h2>Account Details</h2>
            <div className="form-section">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value="Jane Doe" readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value="foodielover@example.com" readOnly />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" value="+94 77 123 4567" readOnly />
              </div>
            </div>
            <div className="orders-list">
              <div className="order-card">
                <h4>Order #1024</h4>
                <p>Status: <span className="order-status delivered">Delivered</span></p>
                <p>Items: Fresh Tomatoes, Orange Juice</p>
              </div>
              <div className="order-card">
                <h4>Order #1032</h4>
                <p>Status: <span className="order-status pending">Pending</span></p>
                <p>Items: Red Apples, Yogurt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
