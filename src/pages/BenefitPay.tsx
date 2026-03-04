import { useCart } from '../context/CartContext';

export default function BenefitPay() {
  const { totalPrice } = useCart();
  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const currentYear = now.getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  return (
    <div
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '13px',
        color: '#333',
        backgroundColor: '#e8e8e8',
        margin: 0,
        padding: '40px 0',
        minHeight: '100vh',
        direction: 'ltr',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '40px 60px',
          minHeight: '700px',
        }}
      >
        {/* Language link */}
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <a href="#" style={{ color: '#D71E28', fontSize: '12px', textDecoration: 'none' }}>
            عربي
          </a>
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {/* Logo + brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/logo.png"
              alt="Golden Touch"
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C2118', lineHeight: 1.2 }}>
                GOLDEN TOUCH
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2C2118', lineHeight: 1.2 }}>
                اللمسة الذهبية
              </div>
            </div>
          </div>

          {/* Center - Benefit title */}
          <div>
            <div style={{ color: '#D71E28', fontWeight: 'bold', fontSize: '13px' }}>
              BENEFIT PAYMENT GATEWAY
            </div>
            <div style={{ color: '#D71E28', fontSize: '12px' }}>{dateStr}</div>
          </div>

          {/* Right - Company info */}
          <div style={{ textAlign: 'right', fontSize: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>GOLDEN TOUCH W.L.L</div>
            <div>goldentouch.com</div>
          </div>
        </div>

        {/* Form */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0', width: '180px', verticalAlign: 'top' }}>Amount</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>
                BD {totalPrice > 0 ? totalPrice.toFixed(3) : '0.000'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', verticalAlign: 'top' }}>Card Type</td>
              <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Debit</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', verticalAlign: 'top' }}>Card Number</td>
              <td style={{ padding: '8px 0' }}>
                <input
                  type="text"
                  maxLength={19}
                  style={{
                    width: '200px',
                    padding: '4px 6px',
                    border: '1px solid #999',
                    fontSize: '13px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                  }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', verticalAlign: 'top' }}>Expiry Date</td>
              <td style={{ padding: '8px 0', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <select
                  style={{
                    padding: '3px 4px',
                    border: '1px solid #999',
                    fontSize: '13px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                  }}
                >
                  <option>MM</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select
                  style={{
                    padding: '3px 4px',
                    border: '1px solid #999',
                    fontSize: '13px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                  }}
                >
                  <option>YYYY</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', verticalAlign: 'top' }}>Card Holders Name</td>
              <td style={{ padding: '8px 0' }}>
                <input
                  type="text"
                  style={{
                    width: '200px',
                    padding: '4px 6px',
                    border: '1px solid #999',
                    fontSize: '13px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Buttons */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            style={{
              backgroundColor: '#D71E28',
              color: '#fff',
              border: '1px solid #D71E28',
              padding: '6px 24px',
              fontSize: '13px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '8px',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          >
            Pay
          </button>
          <button
            onClick={() => window.history.back()}
            style={{
              backgroundColor: '#d9534f',
              color: '#fff',
              border: '1px solid #d43f3a',
              padding: '6px 24px',
              fontSize: '13px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          >
            Cancel
          </button>
        </div>

        {/* View Accepted Cards */}
        <div style={{ marginBottom: '20px' }}>
          <a href="#" style={{ color: '#D71E28', fontSize: '13px', textDecoration: 'none' }}>
            View Accepted Cards
          </a>
        </div>

        {/* Note */}
        <div style={{ marginBottom: '20px', fontSize: '12px', lineHeight: 1.6 }}>
          <strong>Note:</strong> By submitting your information and using "BENEFIT Payment Gateway", you indicate
          that you agree to the{' '}
          <a href="#" style={{ color: '#D71E28', textDecoration: 'none' }}>
            Terms of Services - Legal Disclaimer
          </a>
          .
        </div>

        {/* Footer - Benefit logo */}
        <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.6 }}>
          <img
            src="/benefit_logo.png"
            alt="benefit"
            style={{ height: '60px', display: 'block', marginBottom: '4px' }}
          />
          Powered By The BENEFIT Company.
          <br />
          Copyright © 2020-{currentYear} The BENEFIT Company. All Rights Reserved.
          <br />
          Licensed by Central Bank of Bahrain as Ancillary Service Provider.
        </div>
      </div>
    </div>
  );
}
