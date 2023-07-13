const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout'
        });
        if ((res.data.status = 'success')) location.reload(true);
    } catch (err) {
        console.log(err.response.data.message);
        alert('Error logging out! Try again.');
    }
};

document.querySelector('.logout')?.addEventListener('click', logout);