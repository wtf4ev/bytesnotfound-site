const postBtn = document.getElementById("post-btn");
const usernameInput = document.getElementById("username-input");
const postInput = document.getElementById("post-input");
const postsDiv = document.getElementById("posts");

// Load posts from Firestore in real-time
db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    postsDiv.innerHTML = ""; // Clear existing posts
    snapshot.forEach(doc => {
        const post = doc.data();
        addPostToDOM(doc.id, post.username, post.text, post.likes);
    });
});

// Function to add a post to the DOM
function addPostToDOM(id, username, postText, likes = 0) {
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
        db.collection("posts").doc(id).update({
            likes: firebase.firestore.FieldValue.increment(1)
        });
    });

    // Handle delete button click
    deleteBtn.addEventListener("click", () => {
        db.collection("posts").doc(id).delete();
    });

    postsDiv.prepend(newPost);
}

// Add a new post
postBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const postText = postInput.value.trim();

    if (username !== "" && postText !== "") {
        db.collection("posts").add({
            username,
            text: postText,
            likes: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        postInput.value = ""; // Clear post input
    } else {
        alert("Username and post cannot be empty!");
    }
});
