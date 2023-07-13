exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'ورود',
    });
};

exports.getOverview = (req, res) => {
    res.status(200).render('overview', {
        title: 'بلیط هواپیما ، خرید بلیط هواپیما با الی گشت',
    });
};

exports.getSignUpForm = (req, res) => {
    res.status(200).render('signup', {
        title: 'ُثبت نام',
    });
};

exports.getProfileForm = (req, res) => {
    res.status(200).render('profile', {
        title: 'حساب کاربری',
    });
};

