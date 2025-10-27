import api from "./api";

export async function verifyCode(email: string, codigo: string) {
  try {
    const resp = await api.post("/auth/verificar-codigo", { email, codigo });
    return resp.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || err?.message || "Erro ao verificar código";
    throw new Error(message);
  }
}

export async function sendRecoveryCode(email: string) {
  try {
    const resp = await api.post("/auth/recuperar-senha", { email });
    return resp.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || err?.message || "Erro ao enviar código";
    throw new Error(message);
  }
}

export default { verifyCode, sendRecoveryCode };
