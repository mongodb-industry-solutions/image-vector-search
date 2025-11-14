export async function POST(request) {
  try {
    const body = await request.json();
    
    // Server-side environment variables are accessible here
    const backendUrl = process.env.INTERNAL_API_URL || 
                       process.env.NEXT_PUBLIC_API_URL || 
                       "http://localhost:8000";

    console.log(`Proxying image search request to: ${backendUrl}/imageSearch`);

    const response = await fetch(`${backendUrl}/imageSearch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        detail: 'Image search request failed' 
      }));
      console.error('Backend error:', error);
      return Response.json(error, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
    
  } catch (error) {
    console.error('Image search proxy error:', error);
    return Response.json(
      { 
        error: 'Failed to connect to image search backend', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}