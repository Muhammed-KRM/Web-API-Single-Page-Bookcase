const Auth = {
    isLoggedIn: function () {
        return !!localStorage.getItem('user');
    },

    Logout: function () {
        localStorage.removeItem('user');
    },

    Login: async function (username, password) {
        const response = await fetch('http://localhost:8088/api/Login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        if (data.username) {
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data;
    },

    getUserInfo: function () {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default Auth;  // Varsayılan ihracat
