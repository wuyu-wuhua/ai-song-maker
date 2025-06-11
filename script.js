// ========== Supabase 初始化（放在文件顶部）==========
// 用你的 Supabase 项目 URL 和 anon public key 替换下面内容
const supabaseUrl = 'https://kzkbgfynxnroobfldzck.supabase.co'; // TODO: 替换为你的 Supabase 项目 URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6a2JnZnlueG5yb29iZmxkemNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDAzOTIsImV4cCI6MjA2NTExNjM5Mn0.NC4EFnznmobJRftXRghYanM8m7IAwRf-WKu2KhVgsOY'; // TODO: 替换为你的 anon public key
// 创建 Supabase 客户端
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
// ========== Supabase 初始化结束 ==========

// script.js - 用于处理网站交互，主要是多语言切换

// 只保留英文界面，移除多语言和翻译相关代码

function getRandomGradient() {
    // 随机两个HSL色
    const h1 = Math.floor(Math.random() * 360);
    const h2 = (h1 + Math.floor(Math.random() * 120) + 60) % 360;
    return `linear-gradient(135deg, hsl(${h1}, 70%, 60%) 0%, hsl(${h2}, 80%, 55%) 100%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-google').onclick = async function() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        if (error) alert('Login failed: ' + error.message);
    };
    async function checkLogin() {
        const { data: { user } } = await supabase.auth.getUser();
        const loginBtn = document.getElementById('login-google');
        const avatar = document.getElementById('user-avatar');
        const menu = document.getElementById('user-menu');
        const menuAvatar = document.querySelector('.user-menu-avatar');
        const menuUserEmail = document.getElementById('menu-user-email');
        const logoutBtn = document.getElementById('logout');
        if (user) {
            loginBtn.style.display = 'none';
            avatar.style.display = 'flex';
            menu.style.display = 'none';
            // 随机渐变色
            const gradient = getRandomGradient();
            avatar.style.background = gradient;
            if (menuAvatar) menuAvatar.style.background = gradient;
            if (logoutBtn) {
                logoutBtn.style.background = gradient;
                logoutBtn.style.color = '#fff';
            }
            menuUserEmail.textContent = user.email || '';
        } else {
            loginBtn.style.display = 'inline';
            avatar.style.display = 'none';
            menu.style.display = 'none';
        }
    }
    checkLogin();
    // 悬停头像显示菜单
    const avatar = document.getElementById('user-avatar');
    const menu = document.getElementById('user-menu');
    if (avatar && menu) {
        avatar.addEventListener('mouseenter', () => {
            menu.style.display = 'flex';
        });
        avatar.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!menu.matches(':hover')) menu.style.display = 'none';
            }, 120);
        });
        menu.addEventListener('mouseleave', () => {
            menu.style.display = 'none';
        });
        menu.addEventListener('mouseenter', () => {
            menu.style.display = 'flex';
        });
    }
    document.getElementById('logout').onclick = async function() {
        await supabase.auth.signOut();
        checkLogin();
    };
    supabase.auth.onAuthStateChange((_event, _session) => {
        checkLogin();
    });
    // 表单提交逻辑（如有）
    const songForm = document.getElementById('song-generation-form');
    if (songForm) {
        songForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const lyrics = document.getElementById('lyrics').value;
            const title = document.getElementById('song-title').value;
            const style = document.getElementById('style').value;
            const singerRadio = document.querySelector('input[name="singer"]:checked');
            const singer = singerRadio ? singerRadio.value : 'random';
            if (!style) {
                alert('Please select a style.');
                return;
            }
            const songData = {
                lyrics: lyrics,
                title: title,
                style: style,
                singer: singer
            };
            sessionStorage.setItem('songMakerData', JSON.stringify(songData));
            window.location.href = 'results.html';
        });
    }
}); 