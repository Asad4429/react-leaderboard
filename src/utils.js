import { API_BASE_URL, ENDPOINTS} from './constant'

const prepPath = thePath => API_BASE_URL + thePath;

async function handleResponse(response) {
  const { headers, statusText, status, ok, type } = response;
  const contentType = headers.get('Content-Type');
  const body =
    contentType === 'application/json'
      ? await response.json()
      : await response.text();
  if (!ok) {
    return {
      ok: false,
      message: statusText,
      data: {
        status,
        statusText,
        type,
        body,
        contentType,
      },
    };
  }
  return {
    ok: true,
    data: JSON.parse(body),
    message: '',
  };
}

async function getAccessToken() {
  const resp = await fetch(prepPath(ENDPOINTS.GET_API_TOKEN), {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(handleResponse)
  .catch(() => {
    return 
  });
  if(resp.ok){
    return {
      success: resp.data.success,
      token: resp.data.access_token
    }
  }
  return {
    success: false,
    token: 'Not found'
  }
}

// Helper function to make API requests which requires access token
export async function authedFetch(path) {
  return new Promise(async (resolve, reject) => {
    const { success, token } = await getAccessToken();
    if (!success) {
      return reject({
        ok: false,
        message: 'No tokens found',
        data: {},
      });
    }

    fetch(prepPath(path), {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
    })
    .then(handleResponse)
    .then(resolve)
    .catch(error => {
      reject({
        ok: false,
        data: {
          error,
        },
        message: 'Error thrown!',
      });
    });
  });
}