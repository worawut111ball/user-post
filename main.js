const usersList = document.querySelector('.user');

const makeElement = (tag, attr_n, attr_v, content) => {
    const output = document.createElement(tag);
    (attr_n) && output.setAttribute(attr_n, attr_v);
    output.textContent = content;
    return output;
};

fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(data => data.forEach(el => {
        const li = makeElement('li', 'data-user-id', el.id, `${el.name} / ${el.email}`);
        usersList.append(li);
    }))
    .then(() => {
        document.querySelector('.user').addEventListener('click', function(event) {
            const userId = event.target.getAttribute('data-user-id');
            if (userId) {
                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                    .then(response => response.json())
                    .then(posts => {
                        const postInfo = document.querySelector('.info');
                        postInfo.innerHTML = '';
                        posts.forEach(post => {
                            const postItem = document.createElement('div');
                            postItem.classList.add('post-item');
                            postItem.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
                            postInfo.appendChild(postItem);
                        });
                    })
                    .catch(error => console.error('Error fetching posts:', error));
            }
        });
    });
