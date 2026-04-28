import judgeApi from "./judgeApi";

/**
 * Run code in playground mode.
 * @param {{ language: string, code: string, input?: string }} params
 * @returns {Promise<{ output?: string, error?: string }>}
 */
export async function executeCode({ language, code, input = "" }) {
  const { data } = await judgeApi.post("/execute", { language, code, input });
  return data;
}
