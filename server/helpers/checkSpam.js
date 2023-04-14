const { BayesClassifier } = require("natural");
const classifier = new BayesClassifier();

const fs = require("fs");

const detectSpam = (query) => {
    try {
        const fetchedData = fs.readFileSync("sampleData.json", "utf8");
        var data = JSON.parse(fetchedData);
        
    } catch (err) {
        console.log(err);
    }

    data.map((e) => {
        classifier.addDocument(`'${e.CONTENT}'`, `'${e.CLASS}'`);
    });
    classifier.train();

    

    return classifier.classify(query)
    
};
module.exports={detectSpam}
