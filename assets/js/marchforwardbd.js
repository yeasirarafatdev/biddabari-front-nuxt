window.addEventListener('DOMContentLoaded', function() {

    function StickyNavBar() {
        const header = document.getElementById('header')
        /* let sticky = 0
        // eslint-disable-next-line no-unused-vars
        if (header) sticky = header.offsetTop + 200 */
        window.onscroll = function(e) {
            if (this.oldScroll > this.scrollY) {
                if (window.pageYOffset > 20) header.classList.add('sticky')
                else header.classList.remove('sticky')
                header.classList.remove('header-hidden')
            } else {
                if (window.pageYOffset > 20) header.classList.add('sticky')
                else header.classList.remove('sticky')

                if (window.pageYOffset > 100) header.classList.add('header-hidden')
                else header.classList.remove('header-hidden')
            }
            this.oldScroll = this.scrollY
        }
    }

    StickyNavBar()

    const navMenu = document.querySelector('.nav-menu-icon')
    const navigation = document.getElementById('mobile-nav')
    const mobileNavContainer = document.querySelector('.mobile-nav-container')
    navMenu.addEventListener('click', function() {
        mobileNavContainer.classList.toggle('show')
        navigation.classList.toggle('show')
    })
    const navMenuClose = document.querySelector('.close-nav-menu-icon i')
    navMenuClose.addEventListener('click', function() {
        mobileNavContainer.classList.remove('show')
        navigation.classList.remove('show')
    })

    window.onresize = function() {
        if (window.innerWidth > 768) {
            mobileNavContainer.classList.remove('show')
            navigation.classList.remove('show')
        }
    }

    if (window.pageYOffset > 20) {
        const header = document.getElementById('header')
        header.classList.add('sticky')
        header.classList.remove('header-hidden')
    }

    document.getElementById('mobile-nav').style.display = 'block'
})
