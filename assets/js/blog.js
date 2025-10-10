async function loadMastodonFeed() {
  const accountId = "113610304150041749"; // твой ID
  const instance = "mastodon.social";

  try {
    const response = await fetch(`https://${instance}/api/v1/accounts/${accountId}/statuses?limit=20`);
    if (!response.ok) throw new Error("Ошибка загрузки Mastodon API");
    const posts = await response.json();

    const container = document.getElementById("mastodon-feed");

    container.innerHTML = posts.map(post => {
      // убираем HTML-теги и лишние пробелы
      const cleanText = post.content.replace(/<[^>]*>/g, "").trim();

      // берём первые 3 слова для заголовка
      const words = cleanText.split(/\s+/);
      const title = words.slice(0, 3).join(" ") + (words.length > 3 ? "…" : "");

      return `
        <li class="blog-post-item">
          <a href="${post.url}" target="_blank" rel="noopener">
            <div class="blog-content">
              <div class="blog-meta">
                <p class="blog-category">@krutoj_perec</p>
                <span class="dot"></span>
                <time datetime="${post.created_at}">
                  ${new Date(post.created_at).toLocaleDateString()}
                </time>
              </div>
              <!-- h3 class="h3 blog-item-title">${title}</h3 -->
              <p class="blog-text">${cleanText}</p>
            </div>
          </a>
        </li>
      `;
    }).join("");

  } catch (err) {
    console.error("Ошибка при загрузке Mastodon:", err);
    document.getElementById("mastodon-feed").innerHTML =
      `<li class="blog-post-item"><p class="blog-text">Не удалось загрузить Mastodon посты.</p></li>`;
  }
}

document.addEventListener("DOMContentLoaded", loadMastodonFeed);
