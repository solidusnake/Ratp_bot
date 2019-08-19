const fetch = require("node-fetch");

class Requete {
  constructor(g,f) {
    this.stories = g;
    this.element = f;
  }
  trafic() {
    const url = "https://api-ratp.pierre-grimaud.fr/v4/traffic/metros";
    fetch(url)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(stories => {
        this.stories = stories.result.metros
        this.affichetrafic();
      });
  }

  affichetrafic() {
    this.stories.forEach(element => {
        console.log(element.line + " " + element.message);

    });
  
}
}
const test = new Requete();

console.log(test.trafic());
