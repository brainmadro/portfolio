import Auth from "./auth.js";

export default class NavBar {
    constructor(){
        this.getViewModel();
        this.listenLinksActivate();
    }

    getViewModel(){
        return {
            $nav: $('.navbar'),
            $navbarNav: $('.navbar-nav'),
            links: {
                $logout: $('#logout')
            },
            $menuToggle: $('.menu-toggle'),
        }
    }

    listenLinksActivate() {
        const viewModel = this.getViewModel();
        const $logout = viewModel.links.$logout;
        const $menuToggle = viewModel.$menuToggle;
        const $navbarNav = viewModel.$navbarNav;
        
        $logout.on( "click", event => {
            console.log(event);
            const auth = new Auth();
            auth.logout();
        })
        
        $menuToggle.on('click', event => {
            $navbarNav.toggleClass('active');
        })
    }
}

