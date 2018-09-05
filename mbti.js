const math = require('mathjs');

// 1: Low compatibility
// 2: Possible compatibility 
// 3: Moderate compatibility      
// 4: Good compatibility
// 5: Ideal match
var mbti_1 = parseInt(process.argv[2]);
var mbti_2 = parseInt(process.argv[3]);

const compatibilityTable = [
    [4,4,4,5,4,5,4,4,1,1,1,1,1,1,1,1],
    [4,4,5,4,5,4,4,4,1,1,1,1,1,1,1,1],
    [4,5,4,4,4,4,4,5,1,1,1,1,1,1,1,1],
    [5,4,4,4,4,4,4,4,5,1,1,1,1,1,1,1],
    [4,5,4,4,4,4,4,5,3,3,3,3,2,2,2,2],
    [5,4,4,4,4,4,5,4,3,3,3,3,3,3,3,3],
    [4,4,4,4,4,5,4,4,3,3,3,3,2,2,2,5],
    [4,4,5,4,5,4,4,4,3,3,3,3,2,2,2,2],
    [1,1,1,5,3,3,3,3,2,2,2,2,3,5,3,5],
    [1,1,1,1,3,3,3,3,2,2,2,2,5,3,5,3],
    [1,1,1,1,3,3,3,3,2,2,2,2,3,5,3,5],
    [1,1,1,1,3,3,3,3,2,2,2,2,5,3,5,3],
    [1,1,1,1,2,3,2,2,3,5,3,5,4,4,4,4],
    [1,1,1,1,2,3,2,2,5,3,5,3,4,4,4,4],
    [1,1,1,1,2,3,2,2,3,5,3,5,4,4,4,4],
    [1,1,1,1,2,3,5,2,5,3,5,3,4,4,4,4],
];


var compatibilityScore = math.subset(compatibilityTable, math.index(mbti_1, mbti_2));

console.log(compatibilityScore);



