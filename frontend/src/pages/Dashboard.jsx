function Dashboard() {
  return (
    <section className="admin-section">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-btn active" type="button">
              <i className="fas fa-chart-line" /> Overview
            </button>
            <button className="sidebar-btn" type="button">
              <i className="fas fa-box" /> Products
            </button>
            <button className="sidebar-btn" type="button">
              <i className="fas fa-shopping-cart" /> Orders
            </button>
            <button className="sidebar-btn" type="button">
              <i className="fas fa-users" /> Customers
            </button>
          </div>
        </aside>

        <main className="admin-content">
          <div className="admin-tab active">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-dollar-sign" />
                <h4>Total Sales</h4>
                <div className="stat-number">LKR 42,500</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-shopping-basket" />
                <h4>Orders</h4>
                <div className="stat-number">124</div>
              </div>
              <div className="stat-card">
                <i className="fas fa-users" />
                <h4>Customers</h4>
                <div className="stat-number">89</div>
              </div>
            </div>
            <div className="table-section">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1104</td>
                    <td>Sam</td>
                    <td>Delivered</td>
                    <td>LKR 2,100</td>
                  </tr>
                  <tr>
                    <td>#1105</td>
                    <td>Lisa</td>
                    <td>Pending</td>
                    <td>LKR 1,450</td>
                  </tr>
                  <tr>
                    <td>#1106</td>
                    <td>Mark</td>
                    <td>Delivered</td>
                    <td>LKR 3,320</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
