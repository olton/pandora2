class App {
    currentPage = "";

    constructor(page) {
        this.currentPage = page;
        this.loadPage().then(() => {});
        this.eventHandler();
    }

    async loadPage(){
        const component = `/pages/${this.currentPage}/index.html`;
        const content = await fetch(component).then(response => response.text());
        $("#page-content").html(content);
        if (window["PAGE_TITLE"]) {
            this.setPageTitle(window["PAGE_TITLE"]);
        }
    }

    eventHandler(){
        const that = this;
        $('#side-menu').on('click', 'a', function(e) {
            that.currentPage = $(this).attr('href').substring(1);
            that.loadPage().then(() => {});
            window.history.pushState(null, null, "/#"+that.currentPage);
        })

        $(window).on('popstate', function(e) {
            that.currentPage = location.hash.substring(1);
            that.loadPage().then(() => {});
        })
    }

    setPageTitle(title){
        $("title").html(`${title} - Pandora 2.0 The theme set built with Metro UI`);
        $("#page-title").html(title);
        $("#content-title").html(title);
    }
}

const hash = location.hash;
const target = hash.length > 0 ? hash.substring(1) : "dashboard";

var app = new App(target);
