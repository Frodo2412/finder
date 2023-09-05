export async function POST(request: Request) {
  const requestBody = await request.json();

  const RAILS_API_URL = process.env.RAILS_API_URL;

  if (!RAILS_API_URL) {
    throw new Error('RAILS_API_URL is not defined');
  }

  const URL = process.env.RAILS_API_URL + '/users/login';

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: requestBody.email,
          password: requestBody.password,
        },
      }),
      credentials: 'include',
    });

    const authorizationToken = response.headers.get('Authorization');
    const token = authorizationToken?.split(' ')[1] ?? '';

    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
