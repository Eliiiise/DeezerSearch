import $ from 'jquery'
import Mustache from 'mustache'

export default class Search {

    constructor () {
        this.initEls();
        this.initEvents();
    }

    initEls () {
        this.$els = {
            search: document.forms['js-searchArtiste'].querySelector('input'),
            response: $('.js-response'),

        };
        this.table = [];
        this.tplSearch = '{{#searchArtiste}}<a> <div class="artisteResponse"> <div class="main"> <img src="{{picture_medium}}"> <div> <p class="name">{{name}}</p> <p class="type">{{type}}</p> </div> </div> <p class="nbFan">{{nb_fan}} fans</p> </div> </a>{{/searchArtiste}}' ;
    }

    initEvents () {
        this.getSearchArtiste();
    }

    getSearchArtiste () {
        this.$els.search.addEventListener('keyup', (e) => {
            const term=e.target.value.toLowerCase();


            $.ajax({
                url: `https://mmi.univ-smb.fr/~valloire/deezer-test/artiste.php?q=${term}`,
                dataType: 'json',
                type: 'GET',
            }).done( (response) => {
                this.table = response.data;

                for (const prop in this.table){
                    $('.js-response').html(Mustache.render(this.tplSearch, {searchArtiste : this.table}));
                }

            });
        });
    }
}
