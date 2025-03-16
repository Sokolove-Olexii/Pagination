// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let perPage = 10;

// fetchPostsBtn.addEventListener("click", async () => {
//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//     // Increase the group number
//     page += 1;

//     // Replace button text after first request
//     if (page > 1) {
//       fetchPostsBtn.textContent = "Fetch more posts";
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// async function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: perPage,
//     _page: page,
//   });

//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts?${params}`
//   );
//   return response.data;
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   postList.insertAdjacentHTML("beforeend", markup);
// }

// ^Test fetch code^

const gallery = document.querySelector(".gallery");
const button = document.getElementById("load-more");
const selectQ = document.getElementById("numPage-select");
const selectPerPage = 10;
const API_KEY = "36609011-61ae1cd37a6d0352dff5d0631";

let page = JSON.parse(localStorage.getItem("currentPage")) || 1;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const images = await fetchPosts();
    renderPosts(images);
  } catch (error) {
    console.error("Помилка при завантаженні зображень:", error);
  }
});

button.addEventListener("click", async () => {
  try {
    page += 1;
    const images = await fetchPosts();
    renderPosts(images);
    localStorage.setItem("currentPage", JSON.stringify(page));

    if (page > 1) {
      button.textContent = "Fetch more";
    }
  } catch (error) {
    console.error("Помилка при натисканні кнопки:", error);
  }
});

async function fetchPosts() {
  const query = selectQ?.value || "";
  const response = await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&editors_choice=true&q=${query}&per_page=${selectPerPage}&page=${page}`
  );
  const data = await response.json();
  return data.hits;
}

function renderPosts(images) {
  images.forEach((img) => {
    const imgElement = document.createElement("img");
    imgElement.src = img.webformatURL;
    imgElement.alt = img.tags;
    gallery.appendChild(imgElement);
  });
}
