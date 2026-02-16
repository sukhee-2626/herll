// ===================================
// ADMIN AUTHENTICATION CHECK
// ===================================

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');

    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminLoginTime');
        window.location.href = 'login.html';
    }
}

// Run auth check on page load (except login page)
if (!window.location.pathname.includes('login.html')) {
    checkAuth();
}
