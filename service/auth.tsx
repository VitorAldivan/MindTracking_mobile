import axios from 'axios';

const API_URL = 'http://mindtracking.com/auth/login';

interface LoginPayload {
  email: string;
  senha: string;
}

export async function login(email: string, senha: string) {
  try {
    const response = await axios.post(API_URL, { email, senha }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
}