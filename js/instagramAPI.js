// InstagramのAPIエンドポイント
const instagramEndpoint = 'https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=YOUR_ACCESS_TOKEN';

// 最新の投稿を取得する関数
async function fetchLatestInstagramPosts() {
  try {
    const response = await fetch(instagramEndpoint);
    const data = await response.json();
    return data.data; // データオブジェクトの配列が返されます
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}

// 取得したデータを使用して投稿を表示する関数
async function displayInstagramPosts() {
  const posts = await fetchLatestInstagramPosts();
  const container = document.getElementById('instagram-posts-container');

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <a href="${post.permalink}" target="_blank" rel="noopener noreferrer">
        <span class="square-content">
          <img src="${post.media_url}" alt="${post.caption}" />
        </span>
      </a>
    `;
    container.appendChild(postElement);
  });
}

// ページが読み込まれたときに投稿を表示
window.onload = displayInstagramPosts;