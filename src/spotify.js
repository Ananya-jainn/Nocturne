const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = 'http://127.0.0.1:5173/callback';


const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
 }
const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
 }
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}


const authorizeSpotify = async()=>{
    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL('https://accounts.spotify.com/authorize')

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}


const getToken = async code => {

  // stored in the previous step
        const codeVerifier = localStorage.getItem('code_verifier');
        const url = 'https://accounts.spotify.com/api/token';
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        }

        const body = await fetch(url, payload);
        const response = await body.json();
        console.log("this is spotify.js line 73 console", response);
        
        if (response.access_token) {
            localStorage.setItem('access_token', response.access_token)

            window.history.replaceState(null, "", "/")
        }
        console.log(
            "saved token exists:",
            localStorage.getItem('access_token') ? "YES" : "NO"
        );
}

export {authorizeSpotify , getToken};

