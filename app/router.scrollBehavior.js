export default function(to, from, savedPosition) {
    if (to.hash) {
        return { selector: to.hash, behavior: "smooth" };
    } else if (savedPosition) {
        return savedPosition;
    } else {
        return { x: 0, y: 0 };
    }
};

/*scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
        return { selector: to.hash, behavior: "smooth" };
    } else if (savedPosition) {
        return savedPosition;
    } else {
        return { x: 0, y: 0 };
    }
};*/
