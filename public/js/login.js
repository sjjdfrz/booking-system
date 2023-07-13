const login = async (username, password) => {
    console.log(username, password);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                username,
                password
            }
        });

        if (res.data.status === 'success') {
            alert('Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};

document.querySelector('.form')?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('pwd').value;
    login(username, password);
});

