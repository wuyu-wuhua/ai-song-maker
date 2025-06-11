// components/Login.js
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const handleGoogleLogin = async () => {
    // 调用 Supabase 的 OAuth 登录方法
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h1>欢迎</h1>
      <p>请使用 Google 登录</p>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      >
        使用 Google 登录
      </button>
    </div>
  );
}