import axios from 'axios';
import { type Request, type Response } from 'express';

const clientId = 'Ov23liaNUVvhWC3X1XjW';
const clientSecret = 'ebd27837bf8316d0665d1e9798f764f79490e3ba';

export class AuthController {
  auth = async (request: Request, response: Response) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

    response.redirect(redirectUrl);
  };

  authCallback = async (request: Request, response: Response) => {
    const { code } = request.query;

    const accessTokenResult = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const userDataResult = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessTokenResult.data.access_token}`,
      },
    });

    const { node_id: id, avatar_url: avatarUrl, name } = userDataResult.data;

    return response.status(200).json({ id, avatarUrl, name });
  };
}
