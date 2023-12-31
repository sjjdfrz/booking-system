const signup = async (email, phone, nationalCode, password, passwordConfirm) => {

    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/signup',
            data: {
                email,
                phone,
                nationalCode,
                password,
                passwordConfirm
            }
        });
        if (res.data.status === 'success') {
            alert('Signed Up successfully!');
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
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phoneNumb').value;
    const nationalCode = document.getElementById('nationalCode').value;
    const password = document.getElementById('pwd').value;
    const passwordConfirm = document.getElementById('repeatedPass').value;
    signup(email, Number(phone), nationalCode, password, passwordConfirm);
});