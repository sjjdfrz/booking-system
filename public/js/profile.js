jalaliDatepicker.startWatch();
const getUser = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/me',
        });

        if (res.data.status === 'success') {

            const firstname = res.data.data.firstname ? res.data.data.firstname : "";
            const lastname = res.data.data.lastname ? res.data.data.lastname : "";
            const address = res.data.data.address ? res.data.data.address : "";
            const birthdate = res.data.data.birthdate ? res.data.data.birthdate : "";

            document.getElementById("name").value = firstname;
            document.getElementById("familyName").value = lastname;
            document.getElementById("email").value = res.data.data.email;
            document.getElementById("phoneNum").value = res.data.data.phone;
            document.getElementById("address").value = address;
            document.getElementById("birthDate").value = birthdate;
        }
    } catch (err) {
        alert(err.response.data.message);
    }
};

getUser();

const editProfile = async (data) => {


    if (Object.keys(data).length === 0) {
        alert('داده ای وارد نکرده اید!');
    } else {
        try {
            const res = await axios({
                method: 'PATCH',
                url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
                data
            });

            if (res.data.status === 'success') {
                alert('Data updated successfully!');
                window.setTimeout(() => {
                    location.assign('/');
                }, 1500);
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    }
};

document.getElementById("profileForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const firstname = document.getElementById("name").value;
    const lastname = document.getElementById("familyName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phoneNum").value;
    const address = document.getElementById("address").value;
    const birthdate = document.getElementById("birthDate").value;

    // Create an object to store the defined variables
    const data = {};

    // Add variables to the data object only if they are defined
    if (firstname !== '') data.firstname = firstname;
    if (lastname !== '') data.lastname = lastname;
    if (email !== '') data.email = email;
    if (phone !== '') data.phone = Number(phone);
    if (address !== '') data.address = address;
    if (birthdate !== '') data.birthdate = new Date(birthdate);

    editProfile(data);
});
