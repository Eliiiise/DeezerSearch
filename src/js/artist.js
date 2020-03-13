import $ from 'jquery'
import Mustache from "mustache";

export default class Artist {

    constructor () {
        this.initEls();
        this.initEvents();
    }

    initEls () {
        this.$els = {
            container: $('.js-container'),
            artist: $('.js-artist'),
            response: document.querySelectorAll('.js-response a'),
            responses: $('.js-response'),
            song: $('.js-song'),
        };
        this.table = [];
        this.song = [];
        this.tplArtist = '{{#artist}}<div class="artistPresentation"> <img src="{{picture_medium}}"> <p class="name">{{name}}</p> <p class="type">{{type}}</p> </div>{{/artist}}' ;
        this.tplSong = '{{#song}}<div><main><p class="title">{{title_short}}</p><p class="album">{{album.title}}</p></main><audio controls><source src="{{preview}}" type="audio/mp3"  preload="none">\</audio></div>{{/song}}';
    }

    initEvents () {
        this.getArtist();
    }

    getArtist () {
        this.$els.response.forEach((artistSearch) => {

            artistSearch.addEventListener('click', (e) => {
                const artistSearchId = artistSearch.getAttribute("data-id");

                $.ajax({
                    url: `https://mmi.univ-smb.fr/~valloire/deezer-test/artisteCliked.php?id=${artistSearchId}`,
                    dataType: 'json',
                    type: 'GET',
                    data: 'id=' + artistSearchId,
                }).done( (response) => {
                   this.table = response;
                   this.displayArtist();
                    $.ajax({
                        url: `https://mmi.univ-smb.fr/~valloire/deezer-test/artisteCliked.php`,
                        dataType: 'json',
                        type: 'GET',
                        data : 'id=' + artistSearchId +'/top',
                    }).done( (response) => {
                        this.song = response.data;
                        console.log(this.song);
                        this.displaySong();
                    });
                });
            });
        });
    }

    displayArtist () {
        this.$els.responses.css('display','none');
        this.$els.container.css('display','flex');
        this.$els.artist.html(Mustache.render(this.tplArtist, {artist : this.table}));
    }

    displaySong () {
        this.$els.song.html(Mustache.render(this.tplSong, {song : this.song}));
    }
}
