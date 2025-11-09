export async function handler(event, context) {
    try {
        const { url } = JSON.parse(event.body);
        const response = await fetch('https://api.tinyurl.com/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.TINYURL_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, domain: "tinyurl.com" }),
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Failed to shorten URL' }),
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ shortUrl: data.data.tiny_url }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}       
