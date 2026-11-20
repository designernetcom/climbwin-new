import { useState } from 'react';
import { productService } from '../services';

const ApiTest = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🧪 Testing API connection...');
      const response = await productService.getFeaturedProducts({ per_page: 8 });

      console.log('🧪 Raw Response:', response);
      console.log('🧪 Response Structure:', {
        hasSuccess: 'success' in response,
        successValue: response.success,
        hasData: 'data' in response,
        dataType: typeof response.data,
        dataIsArray: Array.isArray(response.data),
        dataValue: response.data,
      });

      setResult(response);
    } catch (err) {
      console.error('🧪 API Test Error:', err);
      setError({
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        hasResponse: !!err.response,
        hasRequest: !!err.request,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Connection Test</h1>

      <button
        onClick={testApi}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', color: 'blue' }}>
          ⏳ Loading... Check console for logs
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fee', border: '1px solid red' }}>
          <h2 style={{ color: 'red' }}>❌ Error</h2>
          <pre style={{ overflow: 'auto' }}>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#efe', border: '1px solid green' }}>
          <h2 style={{ color: 'green' }}>✅ Success</h2>
          <pre style={{ overflow: 'auto', maxHeight: '400px' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Open DevTools Console (F12)</li>
          <li>Click "Test API Connection" button</li>
          <li>Check the console for detailed logs</li>
          <li>Look for error messages or successful responses</li>
        </ol>
      </div>
    </div>
  );
};

export default ApiTest;
