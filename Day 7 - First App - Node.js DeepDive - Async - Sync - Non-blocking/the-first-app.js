
const objectiveFromCommandLine = process.argv[2];
console.log(process.argv);
const objective = objectiveFromCommandLine ?? "learn";

if (objective === 'learn') {
    console.log('Let\'s understand Node.js and do some coding in Node.js.');
} else {
    console.log('Is ' + objective + ' is more exciting to study?');
}