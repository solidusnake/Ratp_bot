const fetch = require("node-fetch");

class Schedules {
  constructor(type,line,station) {
    /* url server */
    this.url = "https://api-ratp.pierre-grimaud.fr/v4/schedules/";
    /* type metros or rers */
    this.type = type;
    /* line */
    this.line = line;
    /* station example chatelet */
    this.station = station;
    
    this.stories;
    this.tab = [];
    this.tab1 = [];
    this.trans;
  }
  requete() {

    const url = this.url;
    const type = this.type;
    const line = this.line;
    const station = this.station;

    fetch(url + type + line + station)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(stories => {
        this.trans = stories.result.schedules;
        //this.trans = stories.result.rers;
        this.trans.forEach(item => {
          //this.trans;
          //this.type = result.metros
          this.item = item;
          //this.tab.push(this.item.name);
          //console.log(this.item.destination);
        });
        this.affiche();
        //this.destination();
      });
  }
  affiche() {
    //console.log(this.stories);
    //console.log(this.tab);
    this.message(), this.destination();
  }
  message() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab.push(this.item.message);
    });
    console.log(this.tab);
  }
  destination() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab1.push(this.item.destination);
      //console.log(this.item.destination);
    });
    console.log(this.tab1);
  }
}
class Stations {
  constructor(type, line, way) {
    /* url server */
    this.url = "https://api-ratp.pierre-grimaud.fr/v4/stations/";
    /* type metros or rers */
    this.type = type;
    /* line */
    this.line = line;
    /* way */
    this.way = way;

    this.stories;
    this.tab = [];
    this.tab1 = [];
    this.trans;
  }
  requete() {
    const url = this.url;
    const type = this.type;
    const line = this.line;
    const way = this.way;

    fetch(url + type + line + way)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(stories => {
        this.trans = stories.result.stations;
        //this.trans = stories.result.rers;
        this.trans.forEach(item => {
          //this.trans;
          //this.type = result.metros
          this.item = item;
          //this.tab.push(this.item.message);
          //console.log(this.item.name);
        });
        this.affiche();
        //this.destination();
      });
  }
  affiche() {
    //console.log(this.stories);
    //console.log(this.tab);
    this.name(), this.slug();
  }
  name() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab.push(this.item.name);
    });
    console.log(this.tab);
  }
  slug() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab1.push(this.item.slug);
      //console.log(this.item.destination);
    });
    console.log(this.tab1);
  }
}
class lines {
  constructor() {
    /* url server */
    this.url = "https://api-ratp.pierre-grimaud.fr/v4/lines/";
    /* type metros or rers */
    //this.type = type;
    this.stories;
    this.tab = [];
    this.tab1 = [];
    this.trans;
  }
  requete() {
    const url = this.url;
    //const type = this.type;

    fetch(url)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(stories => {
        this.trans = stories.result.metros;
        //this.trans = stories.result.rers;
        this.trans.forEach(item => {
          //this.trans;
          //this.type = result.metros
          this.item = item;
          //this.tab.push(this.item.message);
          //console.log(this.item.name);
        });
        this.affiche();
        //this.destination();
      });
  }
  affiche() {
    //console.log(this.stories);
    //console.log(this.tab);
    this.name(), this.code();
  }
  name() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab.push(this.item.name);
    });
    console.log(this.tab);
  }
  code() {
    this.trans;
    //this.trans = stories.result.rers;
    this.trans.forEach(item => {
      this.trans;
      //this.type = result.metros
      this.item = item;
      this.tab1.push(this.item.code);
      //console.log(this.item.destination);
    });
    console.log(this.tab1);
  }
}

//const test1 = new Schedules("rers/", "A/", "charles+de+gaulle+etoile/R");
//test1.requete();
const test2 = new Schedules("metros/", "1/", "chatelet/R");
test2.requete();
const s = new Stations("tramways/", "1", "?way=A");
s.requete();
const ttt = new lines();
ttt.requete();