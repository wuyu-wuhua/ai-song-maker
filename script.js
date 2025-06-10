// script.js - 用于处理网站交互，主要是多语言切换

// --- 翻译数据 --- Start --- 
// 将 en.json 和 zh.json 的内容直接写入 JavaScript 对象
const translationsData = {
    en: {
        "pageTitle": "Song Maker: Create AI Music Easily and Free",
        "pageDescription": "Discover the power of AI song making. Create unique music tracks effortlessly for free with our intuitive platform. Used by thousands, simple and practical.",
        "logoText": "Song Maker",
        "heroTitle": "Create Your Next Hit with AI Song Maker",
        "heroSubtitle": "Effortlessly generate unique, royalty-free music in seconds. Free, simple, and loved by creators worldwide.",
        "heroButton": "Start Creating Now",
        "heroGuide": "How it works: 1. Choose style 2. Generate 3. Download!",
        "generatorTitle": "AI Song Composer and AI Music Maker",
        "generatorDescription": "Use our AI song composer to easily create music. Easily create tracks, generate AI songs, and enjoy royalty-free original music.",
        "generatorTrialButton": "Free Trial AI Song Composer and AI Music Maker >>",
        "tabLyrics": "Lyrics",
        "tabCustom": "Custom Mode",
        "labelInstrumental": "Instrumental",
        "labelLyrics2": "Lyrics",
        "placeholderLyrics": "Enter your lyrics here...",
        "labelTitle": "Title",
        "placeholderTitle": "Enter your song title",
        "labelStyle": "Style",
        "selectStylePrompt": "Select a style...",
        "labelVoice": "Voice",
        "voiceMale": "Male",
        "voiceFemale": "Female",
        "voiceRandom": "Random",
        "buttonGenerate": "Generate",
        "generateDisclaimer": "Lyrics, title, and style should not contain sensitive content.",
        "featuresTitle": "How AI Song Maker Transforms Music Creation",
        "featuresDesc": "Our advanced AI analyzes patterns and structures to compose original melodies and harmonies just for you. Experience the future of music creation with Song Maker technology – it's intuitive, fast, and surprisingly creative. No musical background needed!",
        "featuresDescExpanded1": "Dive deeper into the magic of AI song making. Our platform leverages sophisticated machine learning models trained on vast datasets of musical compositions. This allows the AI song composer to understand the nuances of melody, harmony, rhythm, and instrumentation across various genres. When you initiate song making, the AI doesn't just randomly assemble notes; it intelligently crafts musical phrases that make sense together, creating coherent and often surprisingly emotive pieces. This powerful song making capability puts professional-sounding music creation within everyone's reach.",
        "featuresDescExpanded2": "Forget complex software and steep learning curves. Our commitment is to make song making accessible and enjoyable. Whether you're a seasoned musician looking for inspiration or a complete novice wanting to add a unique soundtrack to your project, our AI music making tool provides a seamless experience. The process focuses on your creative input – the lyrics, the desired style, the mood – and handles the technical heavy lifting of composition and arrangement, delivering high-quality AI song making results every time.",
        "featuresBenefit1": "Benefit 1: Speed",
        "featuresBenefit1Desc": "Generate tracks in seconds, not hours. In today's fast-paced world, time is precious. Traditional music composition can take days, weeks, or even months. Our AI song making technology slashes that time dramatically. Need a jingle for an ad, background music for a presentation, or a quick demo track? Get results in mere seconds. This rapid song making workflow allows creators to focus on their core tasks without getting bogged down in lengthy music production cycles. Speed is a key advantage of modern AI music making.",
        "featuresBenefit2": "Benefit 2: Uniqueness",
        "featuresBenefit2Desc": "Every generated song is original and royalty-free. Every piece created using our song making platform is algorithmically unique. While the AI learns from existing music, its output is entirely original, ensuring your projects stand out. Furthermore, all music generated is completely royalty-free, meaning you can use it in your personal or commercial projects without worrying about licensing fees or copyright claims. This combination of originality and freedom is a hallmark of our AI song making service, providing peace of mind for creators relying on AI music making.",
        "featuresBenefit3": "Benefit 3: Simplicity Perfected",
        "featuresBenefit3Desc": "We believe powerful technology shouldn't be complicated. Our interface is designed for intuitive navigation, making the song making process straightforward. Select your parameters, input your ideas, and let the AI song composer do the rest. No confusing menus, no overwhelming options – just pure, simple AI music making at your fingertips. This ease of use is central to our philosophy of democratizing music creation through advanced song making.",
        "featuresBenefit4": "Benefit 4: Explore Any Style",
        "featuresBenefit4Desc": "From upbeat Pop anthems and driving Rock tracks to soulful R&B ballads and atmospheric Ambient soundscapes, our AI song making engine is remarkably versatile. Don't feel limited by genre conventions! Experiment freely and discover new sonic territories. The AI song composer constantly learns and adapts, offering a wide palette for your musical explorations. This versatility makes our song making tool perfect for diverse projects requiring different musical moods and styles.",
        "testimonialsTitle": "Loved by Creators Everywhere",
        "testimonial1": "\"I was skeptical at first, but the results are amazing! Generated a perfect background track for my video in minutes. Super intuitive!\"",
        "testimonial1Author": "- Alex R.",
        "testimonial2": "\"Finally, a tool that makes music creation accessible. As a beginner, I found it incredibly easy to use and the quality is fantastic. Highly recommend!\"",
        "testimonial2Author": "- Maya K.",
        "testimonial3": "\"This is a game-changer for indie developers like me. Getting custom music used to be expensive and time-consuming. Now it's fast and free!\"",
        "testimonial3Author": "- Jamie L.",
        "caseStudiesTitle": "Real Success with Generated Music",
        "caseStudiesDesc": "Thousands are using AI-generated music for videos, podcasts, games, presentations, and more. See how our free tool empowers creativity across different fields.",
        "caseStudy1": "Case Study 1: YouTube Creator",
        "caseStudy1Desc": "Boosted video engagement with unique background music.",
        "caseStudy2": "Case Study 2: Indie Game Dev",
        "caseStudy2Desc": "Created an entire game soundtrack quickly and affordably.",
        "ctaTitle": "Ready to Compose Your Masterpiece?",
        "ctaDesc": "Join thousands of users creating amazing music for free. Click the button below to start your musical journey with AI song making.",
        "ctaButton": "Start Generating for Free",
        "copyrightText": "© 2024 Song Maker. All rights reserved.",
        "contactEmail": "Contact: ytsgabcde00020@2925.com"
    },
    zh: {
        "pageTitle": "歌曲制作：轻松免费创作 AI 音乐",
        "pageDescription": "探索 AI 歌曲制作的强大功能。使用我们直观的平台，轻松免费地创作独特的音乐曲目。深受数千用户喜爱，简单实用。",
        "logoText": "歌曲制作",
        "heroTitle": "使用 AI 歌曲制作创作您的下一首热门歌曲",
        "heroSubtitle": "在几秒钟内轻松生成独特的、免版税的音乐。免费、简单，深受全球创作者喜爱。",
        "heroButton": "立即开始创作",
        "heroGuide": "工作原理：1. 选择风格 2. 生成 3. 下载！",
        "generatorTitle": "AI 歌曲创作器和 AI 音乐制作器",
        "generatorDescription": "使用我们的 AI 歌曲创作器轻松创作音乐。轻松创建曲目、生成 AI 歌曲，并享受免版税的原创音乐。",
        "generatorTrialButton": "免费试用 AI 歌曲创作器和 AI 音乐制作器 >>",
        "tabLyrics": "歌词",
        "tabCustom": "自定义模式",
        "labelInstrumental": "纯音乐",
        "labelLyrics2": "歌词",
        "placeholderLyrics": "在此输入您的歌词...",
        "labelTitle": "标题",
        "placeholderTitle": "输入您的歌曲标题",
        "labelStyle": "风格",
        "selectStylePrompt": "请选择风格...",
        "labelVoice": "声音",
        "voiceMale": "男声",
        "voiceFemale": "女声",
        "voiceRandom": "随机",
        "buttonGenerate": "生成",
        "generateDisclaimer": "歌词、标题和风格不应包含敏感内容。",
        "featuresTitle": "AI 歌曲制作如何改变音乐创作",
        "featuresDesc": "我们先进的 AI 分析模式和结构，为您创作原创的旋律与和声。通过歌曲制作技术体验音乐创作的未来——它直观、快速且富有惊人的创造力。无需音乐背景！",
        "featuresDescExpanded1": "深入了解 AI 歌曲制作的魔力。我们的平台利用了在海量音乐作品数据集上训练的复杂机器学习模型。这使得 AI 歌曲创作器能够理解各种流派中旋律、和声、节奏和乐器的细微差别。当您启动歌曲制作时，AI 不仅仅是随机组合音符；它会智能地构建有意义的音乐乐句，创作出连贯且常常令人惊讶地富有情感的作品。这种强大的歌曲制作能力让专业水准的音乐创作触手可及。",
        "featuresDescExpanded2": "忘记复杂的软件和陡峭的学习曲线。我们的承诺是让歌曲制作变得易于使用和充满乐趣。无论您是寻找灵感的经验丰富的音乐家，还是希望为项目添加独特配乐的新手，我们的 AI 音乐制作工具都能提供无缝的体验。整个过程专注于您的创意输入——歌词、期望的风格、情绪——并处理作曲和编曲的技术难题，每次都能提供高质量的 AI 歌曲制作结果。",
        "featuresBenefit1": "优势 1：速度",
        "featuresBenefit1Desc": "几秒钟内生成曲目，而非数小时。在当今快节奏的世界中，时间是宝贵的。传统的音乐创作可能需要数天、数周甚至数月。我们的 AI 歌曲制作技术极大地缩短了这一时间。需要广告配乐、演示文稿背景音乐或快速演示曲目？只需几秒钟即可获得结果。这种快速的歌曲制作工作流程使创作者能够专注于核心任务，而不会陷入冗长的音乐制作周期。速度是现代 AI 音乐制作的一个关键优势。",
        "featuresBenefit2": "优势 2：独特性",
        "featuresBenefit2Desc": "每首生成的歌曲都是原创且免版税的。使用我们歌曲制作平台创作的每一首作品在算法上都是独一无二的。虽然 AI 从现有音乐中学习，但其输出完全是原创的，确保您的项目脱颖而出。此外，所有生成的音乐都是完全免版税的，这意味着您可以在个人或商业项目中使用它，而无需担心许可费用或版权索赔。这种原创性和自由度的结合是我们 AI 歌曲制作服务的一个标志，为依赖 AI 音乐制作的创作者提供了安心。",
        "featuresBenefit3": "优势 3：极致简洁",
        "featuresBenefit3Desc": "我们相信强大的技术不应复杂难懂。我们的界面设计直观易用，让歌曲制作过程简单明了。选择您的参数，输入您的想法，然后让 AI 歌曲创作器完成剩下的工作。没有令人困惑的菜单，没有过多的选项——只有纯粹、简单的 AI 音乐制作触手可及。这种易用性是我们通过先进歌曲制作技术普及音乐创作的核心理念。",
        "featuresBenefit4": "优势 4：探索任何风格",
        "featuresBenefit4Desc": "从欢快的流行歌曲、强劲的摇滚乐曲到深情的 R&B 歌谣和氛围化的环境音景，我们的 AI 歌曲制作引擎具有惊人的多功能性。不要被流派惯例所限制！自由尝试，发现新的声音领域。AI 歌曲创作器不断学习和适应，为您的音乐探索提供广泛的选择。这种多功能性使我们的歌曲制作工具非常适合需要不同音乐情绪和风格的多样化项目。",
        "testimonialsTitle": "深受各地创作者喜爱",
        "testimonial1": "“一开始我持怀疑态度，但结果太棒了！几分钟内就为我的视频生成了完美的背景音乐。超级直观！”",
        "testimonial1Author": "- Alex R.",
        "testimonial2": "“终于有了一个让音乐创作变得触手可及的工具。作为初学者，我发现它非常易于使用，而且质量很棒。强烈推荐！”",
        "testimonial2Author": "- Maya K.",
        "testimonial3": "“这对于像我这样的独立开发者来说是颠覆性的。获取定制音乐过去既昂贵又耗时。现在它快速而且免费！”",
        "testimonial3Author": "- Jamie L.",
        "caseStudiesTitle": "生成音乐的真实成功案例",
        "caseStudiesDesc": "成千上万的人正在使用 AI 生成的音乐用于视频、播客、游戏、演示等。了解我们的免费工具如何在不同领域激发创造力。",
        "caseStudy1": "案例 1：YouTube 创作者",
        "caseStudy1Desc": "通过独特的背景音乐提高了视频参与度。",
        "caseStudy2": "案例 2：独立游戏开发者",
        "caseStudy2Desc": "快速且经济地创作了整个游戏配乐。",
        "ctaTitle": "准备好谱写您的杰作了吗？",
        "ctaDesc": "加入成千上万免费创作精彩音乐的用户。点击下方按钮，通过 AI 歌曲制作开始您的音乐之旅。",
        "ctaButton": "免费开始生成",
        "copyrightText": "© 2024 歌曲制作。保留所有权利。",
        "contactEmail": "联系方式: ytsgabcde00020@2925.com"
    }
};
// --- 翻译数据 --- End ---

// 等待 DOM 内容加载完成后执行
document.addEventListener('DOMContentLoaded', () => {

    // 获取语言切换按钮的容器
    const languageSwitcher = document.querySelector('.language-switcher');
    // 定义默认语言
    const defaultLang = 'en';
    // 定义支持的语言列表 (更新为只包含 en 和 zh)
    const supportedLangs = ['en', 'zh'];

    // 函数：根据选择的语言应用翻译
    function applyTranslations(lang) {
        // 检查语言是否支持，否则使用默认语言
        if (!supportedLangs.includes(lang)) {
            console.warn(`Language "${lang}" not supported. Falling back to ${defaultLang}.`);
            lang = defaultLang;
        }

        // 从 translationsData 获取对应语言的翻译对象
        const translations = translationsData[lang];

        // 检查翻译对象是否存在
        if (!translations) {
            console.error(`Translations not found for language: ${lang}`);
            return; // 如果找不到翻译数据则退出
        }

        // 选取所有带有 data-key 属性的元素并更新文本
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                if (element.tagName === 'META' && element.name === 'description') {
                    element.content = translations[key];
                } else if (element.tagName === 'TITLE') {
                    element.textContent = translations[key];
                } else {
                    // 对于输入框 placeholder，需要设置 placeholder 属性
                    if (element.placeholder && element.hasAttribute('data-key')) {
                         element.placeholder = translations[key];
                    }
                     // 其他元素更新 textContent
                     else {
                         element.textContent = translations[key];
                    }
                }
            } else {
                // 如果某个 key 在当前语言中没有翻译，可以选择保留原文或显示提示
                // console.warn(`Missing translation for key: ${key} in language: ${lang}`);
            }
        });

        // 更新 HTML 标签的 lang 属性
        document.documentElement.lang = lang;
        // (可选) 将选择的语言存入 localStorage
        localStorage.setItem('preferredLang', lang);
    }


    // 为语言切换按钮容器添加事件监听器 (使用事件委托)
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', (event) => {
            // 检查点击的是否是 button 元素并且带有 data-lang 属性
            if (event.target.tagName === 'BUTTON' && event.target.dataset.lang) {
                // 获取目标语言
                const selectedLang = event.target.dataset.lang;
                // 应用选中的语言翻译
                applyTranslations(selectedLang);
            }
        });
    }

    // 获取 "Start Creating Now" 按钮 和 生成器 UI 容器
    const startButton = document.querySelector('.hero-start-button'); // 使用我们添加的特定类名
    const ctaScrollButton = document.querySelector('.cta-scroll-button'); // 获取 CTA 区块的按钮
    const generatorUI = document.getElementById('generator-ui');

    // 检查按钮和 UI 容器是否存在
    if (startButton && generatorUI) {
        // 为 "Start Creating Now" 按钮添加点击事件监听器
        startButton.addEventListener('click', (event) => {
            // 阻止按钮的默认行为 (如果是 <form> 内的 button 可能需要)
            event.preventDefault(); 
            // 平滑滚动到生成器 UI
            generatorUI.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // 为 CTA 区块的滚动按钮添加事件监听器
    if (ctaScrollButton && generatorUI) {
         ctaScrollButton.addEventListener('click', (event) => {
            // 阻止按钮的默认行为
            event.preventDefault(); 
            // 平滑滚动到生成器 UI
            generatorUI.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // 初始化：检查 localStorage 中是否有保存的语言偏好，否则使用默认语言
    const preferredLang = localStorage.getItem('preferredLang') || defaultLang;
    // 在页面加载时应用初始语言
    applyTranslations(preferredLang);

    // --- Form Submission Handling --- Start ---
    const songForm = document.getElementById('song-generation-form');

    if (songForm) {
        songForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default page reload

            // Get form data
            const lyrics = document.getElementById('lyrics').value;
            const title = document.getElementById('song-title').value;
            const style = document.getElementById('style').value;
            const singerRadio = document.querySelector('input[name="singer"]:checked');
            const singer = singerRadio ? singerRadio.value : 'random'; // Default to random if somehow none is checked

            // Basic validation (optional but recommended)
            if (!style) {
                alert('Please select a style.'); // Simple alert, can be improved
                return;
            }
            // Add more validation if needed (e.g., for title or lyrics length)

            // Store data in sessionStorage (cleared when browser tab is closed)
            const songData = {
                lyrics: lyrics,
                title: title,
                style: style,
                singer: singer
            };
            sessionStorage.setItem('songMakerData', JSON.stringify(songData));

            // Redirect to the results page
            window.location.href = 'results.html';
        });
    }
    // --- Form Submission Handling --- End ---

    function onGoogleSignIn(response) {
        // response.credential 是 Google 返回的 JWT
        const idToken = response.credential;
        // 你可以在这里显示用户信息，或存储 token
        console.log('Google ID Token:', idToken);
    }

}); 

// ===== Google 登录集成 =====
const GOOGLE_CLIENT_ID = '130409931134-bu1q26o27ouvqbbs58rpmucthudcjaeo.apps.googleusercontent.com';

function renderGoogleSignIn() {
  const authArea = document.getElementById('google-auth-area');
  if (!authArea) return;

  // 清空区域
  authArea.innerHTML = '';

  // 检查本地是否已登录
  const user = JSON.parse(localStorage.getItem('googleUser') || 'null');
  if (user && user.name) {
    // 显示用户名
    const nameSpan = document.createElement('span');
    nameSpan.id = 'google-username';
    nameSpan.textContent = user.name;
    authArea.appendChild(nameSpan);

    // 可选：添加登出按钮
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.style.marginLeft = '0.8rem';
    logoutBtn.onclick = function() {
      localStorage.removeItem('googleUser');
      renderGoogleSignIn();
    };
    authArea.appendChild(logoutBtn);
    return;
  }

  // 未登录，渲染 Google 登录按钮
  const signInDiv = document.createElement('div');
  signInDiv.id = 'google-signin-btn';
  authArea.appendChild(signInDiv);

  // 渲染 Google 按钮
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredentialResponse,
      ux_mode: 'popup'
    });
    window.google.accounts.id.renderButton(
      signInDiv,
      { theme: 'outline', size: 'large' }
    );
  }
}

// Google 登录回调
function handleGoogleCredentialResponse(response) {
  // 解析 JWT 获取用户名
  const idToken = response.credential;
  const payload = JSON.parse(atob(idToken.split('.')[1]));
  const user = {
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  };
  localStorage.setItem('googleUser', JSON.stringify(user));
  renderGoogleSignIn();
}

// 页面加载后渲染
window.addEventListener('DOMContentLoaded', function() {
  renderGoogleSignIn();
}); 