// Admin - Voucher List Page
import { useState, useEffect } from 'react';

export default function VoucherListPage() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    // TODO: Fetch vouchers dari API
  }, []);

  return (
    <div className="voucher-list-page">
      <div className="page-header">
        <h1>Vouchers</h1>
        <a href="/admin/voucher/tambah">Add Voucher</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Discount</th>
            <th>Max Usage</th>
            <th>Used</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.id}>
              <td>{voucher.id}</td>
              <td>{voucher.code}</td>
              <td>{voucher.discount}%</td>
              <td>{voucher.max_usage}</td>
              <td>{voucher.used_count}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
