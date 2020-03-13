import '../css/app.scss';
import Search from "./search";

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application
        new Search();
    }
}

new App();
