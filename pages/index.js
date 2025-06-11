// pages/index.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Login from '../components/Login' // 引入我们刚创建的登录组件

export default function Home() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // 1. 页面加载时，获取当前会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // 2. 监听认证状态变化 (核心！)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // 3. 组件卸载时，清除监听器
    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  // 如果正在加载会话信息，可以显示一个加载提示
  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div className="container" style={{ padding: '50px 0' }}>
      {!session ? (
        // 如果用户未登录，显示 Login 组件
        <Login />
      ) : (
        // 如果用户已登录，显示欢迎信息和登出按钮
        <div style={{ textAlign: 'center' }}>
          <h2>欢迎回来, {session.user.email}!</h2>
          <p>你已成功登录。</p>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  )
}