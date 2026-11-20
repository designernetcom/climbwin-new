/**
 * Parse and format API error responses
 */
export const parseApiError = (error) => {
  console.error('API Error:', error);

  // Default error
  let errorData = {
    title: 'Error',
    message: 'An unexpected error occurred',
    errors: {},
  };

  // Check if error has response
  if (error.response) {
    const { data, status } = error.response;

    // Set title based on status
    if (status === 400) errorData.title = 'Bad Request';
    else if (status === 401) errorData.title = 'Unauthorized';
    else if (status === 403) errorData.title = 'Forbidden';
    else if (status === 404) errorData.title = 'Not Found';
    else if (status === 422) errorData.title = 'Validation Error';
    else if (status === 500) errorData.title = 'Server Error';

    // Extract message
    if (data?.message) {
      errorData.message = data.message;
    }

    // Extract validation errors
    if (data?.errors) {
      errorData.errors = data.errors;

      // Format errors into a readable string
      const errorList = Object.entries(data.errors).map(([field, messages]) => {
        const messageText = Array.isArray(messages) ? messages.join(', ') : messages;
        return `• ${field}: ${messageText}`;
      });

      errorData.message = errorList.join('\n');
    }
  } else if (error.request) {
    // Request made but no response
    errorData.title = 'Network Error';
    errorData.message = 'No response from server. Please check your internet connection.';
  } else {
    // Something else happened
    errorData.message = error.message || 'An unexpected error occurred';
  }

  return errorData;
};

/**
 * Display error using SweetAlert2
 */
export const showError = (error, Swal) => {
  const errorData = parseApiError(error);

  Swal.fire({
    title: errorData.title,
    text: errorData.message,
    icon: 'error',
    confirmButtonText: 'OK',
    customClass: {
      popup: 'error-popup',
    },
  });
};

/**
 * Log detailed error information for debugging
 */
export const logError = (context, error) => {
  console.group(`❌ Error in ${context}`);
  console.error('Error object:', error);

  if (error.response) {
    console.error('Response status:', error.response.status);
    console.error('Response data:', error.response.data);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    console.error('Request:', error.request);
  }

  console.error('Error message:', error.message);
  console.error('Error config:', error.config);
  console.groupEnd();
};
