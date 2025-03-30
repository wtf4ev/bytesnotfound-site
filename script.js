const postBtn = document.getElementById("post-btn");
const usernameInput = document.getElementById("username-input");
const postInput = document.getElementById("post-input");
const postsDiv = document.getElementById("posts");

// Load saved posts from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.forEach((post, index) => {
        addPostToDOM(post.username, post.text, post.likes, index);
    });
});

// Function to add a post to the DOM
function addPostToDOM(username, postText, likes = 0, index) {
    const newPost = document.createElement("div");
    newPost.classList.add("post");
    newPost.innerHTML = `
        <p class="username">${username}</p>
        <p>${postText}</p>
        <button class="like-btn">❤️ ${likes}</button>
        <button class="delete-btn">🗑️ Delete</button>
    `;

    const likeBtn = newPost.querySelector(".like-btn");
    const deleteBtn = newPost.querySelector(".delete-btn");

    // Handle like button click
    likeBtn.addEventListener("click", () => {
        let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts[index].likes += 1;
        localStorage.setItem("posts", JSON.stringify(savedPosts));
        likeBtn.innerText = `❤️ ${savedPosts[index].likes}`;
    });

    // Handle delete button click
    deleteBtn.addEventListener("click", () => {
        let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts.splice(index, 1); // Remove from array
        localStorage.setItem("posts", JSON.stringify(savedPosts));
        newPost.remove();
    });

    postsDiv.prepend(newPost);
}

// Add a new post
postBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const postText = postInput.value.trim();

    if (username !== "" && postText !== "") {
        let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts.unshift({ username, text: postText, likes: 0 });
        localStorage.setItem("posts", JSON.stringify(savedPosts));

        addPostToDOM(username, postText, 0, 0);

        postInput.value = ""; // Clear post input
    } else {
        alert("Username and post cannot be empty!");
    }
});
