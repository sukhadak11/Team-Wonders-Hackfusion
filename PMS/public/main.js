// Simulated user authentication, replace this with actual authentication logic
const isAuthenticated = true;

// Simulated user data, replace this with actual user data from server
const userData = {
    username: "example_user",
    email: "user@example.com"
};

// Check authentication status
if (isAuthenticated) {
    // Display user profile information
    document.getElementById('profile').innerHTML = `
        <p><strong>Username:</strong> ${userData.username}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
    `;

    // Handle post submission
    document.getElementById('post-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var postContent = document.getElementById('post-content').value;
        
        // Here you would handle uploading the post to the server
        // For simplicity, let's assume the post is successfully uploaded
        alert('Post uploaded successfully!');
        // You can also add logic here to update the post feed dynamically without reloading the page
    });

    // Simulated posts data, replace this with actual posts data from server
    const postsData = [
        {
            username: "user1",
            content: "This is a sample post.",
            likes: 5,
            comments: [
                { username: "user2", content: "Nice post!" },
                { username: "user3", content: "Great job!" }
            ]
        },
        {
            username: "user2",
            content: "Another post example.",
            likes: 10,
            comments: [
                { username: "user1", content: "Well done!" }
            ]
        }
    ];

    // Display posts in the feed
    const feedSection = document.getElementById('feed');
    postsData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p><strong>${post.username}:</strong> ${post.content}</p>
            <button class="like-btn">Like (${post.likes})</button>
            <button class="comment-btn">Comment</button>
            <div class="comments">
                ${post.comments.map(comment => `<p><strong>${comment.username}:</strong> ${comment.content}</p>`).join('')}
            </div>
            <hr>
        `;
        feedSection.appendChild(postElement);

        // Like button functionality
        const likeButton = postElement.querySelector('.like-btn');
        likeButton.addEventListener('click', function() {
            post.likes++;
            likeButton.textContent = `Like (${post.likes})`;
        });

        // Comment button functionality
        const commentButton = postElement.querySelector('.comment-btn');
        commentButton.addEventListener('click', function() {
            const commentContent = prompt('Enter your comment:');
            if (commentContent) {
                post.comments.push({ username: userData.username, content: commentContent });
                const commentsContainer = postElement.querySelector('.comments');
                commentsContainer.innerHTML += `<p><strong>${userData.username}:</strong> ${commentContent}</p>`;
            }
        });
    });
} else {
    // If not authenticated, redirect to login page
    window.location.href = "/login";
}
