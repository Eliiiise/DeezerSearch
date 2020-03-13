import $ from 'jquery';
import Mustache from 'mustache';
import Artist from "./artist";

export default class Search {

    constructor () {
        this.initEls();
        this.initEvents();
    }

    initEls () {
        this.$els = {
            search: document.forms['js-searchArtiste'].querySelector('input'),
            response: $('.js-response'),
            container: $('.js-container'),
        };
        this.table = [];
        this.tplSearch = '{{#searchArtiste}}<a data-id="{{id}}"><div class="artisteResponse"> <div class="main"> <img src="{{picture_medium}}"> <div> <p class="name">{{name}}</p> <p class="type">{{type}}</p> </div> </div> <p class="nbFan">{{nb_fan}} fans</p> </div></a>{{/searchArtiste}}' ;
    }

    initEvents () {
        this.getSearchArtist();
    }

    getSearchArtist () {
        this.$els.search.addEventListener('keyup', (e) => {
            this.$els.response.css('display','flex');
            this.$els.container.css('display','none');
            const term=e.target.value.toLowerCase();

            console.log(term);
            $.ajax({
                url: `https://mmi.univ-smb.fr/~valloire/deezer-test/artiste.php`,
                dataType: 'json',
                type: 'GET',
                data : 'q=' + term,
            }).done( (response) => {
                this.table = response.data;
                this.displaySearchArtist();
            });
        });
    }

    displaySearchArtist () {

        this.$els.response.html(Mustache.render(this.tplSearch, {searchArtiste : this.table}));
        new Artist();
    }
}
