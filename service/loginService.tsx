import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

function decodeJwt(token: string) {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) return null;
		const payload = parts[1];
		const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		let json: string | null = null;
		const atobFn = (global as any).atob || (globalThis as any).atob;
		if (typeof atobFn === 'function') {
			const decoded = atobFn(base64);
			json = decodeURIComponent(
				Array.prototype.map
					.call(decoded, function (c: string) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join('')
			);
		} else if (typeof (global as any).Buffer !== 'undefined') {
			json = (global as any).Buffer.from(base64, 'base64').toString('utf8');
		} else {
			return null;
		}
		if (!json) return null;
		return JSON.parse(json);
	} catch (err) {
		return null;
	}
}

export async function login(email: string, senha: string) {
	try {
			const response = await api.post(
				"/auth/login",
				{ email, senha }
			);

		if (response.data && response.data.token) {
			const token = String(response.data.token);
			try {
				await AsyncStorage.setItem('token', token);
			} catch (e) {
				// ignore storage errors
			}

			// save provided email as fallback
			try {
				await AsyncStorage.setItem('email', String(email));
			} catch (e) {
				// ignore
			}

			// try to extract nome/email from JWT payload
			try {
				const payload = decodeJwt(token);
				if (payload) {
					if (payload.nome) {
						try {
							await AsyncStorage.setItem('nome', String(payload.nome));
						} catch (e) {
							// ignore
						}
					}
					if (payload.email) {
						try {
							await AsyncStorage.setItem('email', String(payload.email));
						} catch (e) {
							// ignore
						}
					}
				} else {
					// fallback to top-level response fields
					if (response.data.nome) {
						try {
							await AsyncStorage.setItem('nome', String(response.data.nome));
						} catch (e) {
							// ignore
						}
					}
				}
			} catch (e) {
				// ignore decoding errors
			}

			return response.data;
		}

		throw new Error(response.data?.message || 'Resposta inesperada do servidor.');
	} catch (err: any) {
		// rethrow a normalized error
		const message = err?.response?.data?.message || err?.message || 'Erro ao fazer login';
		throw new Error(message);
	}
}
