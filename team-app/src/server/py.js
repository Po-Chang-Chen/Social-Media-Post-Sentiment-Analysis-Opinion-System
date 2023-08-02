let { PythonShell } = require('python-shell')
let pyshell = new PythonShell('e1.py');

// sends a message to the Python script via stdin
//pyshell.send('hello');

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    //console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log('finished');
});
let pyshell1 = new PythonShell('pttDataToMysql.py');

// sends a message to the Python script via stdin
//pyshell.send('hello');

pyshell1.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    //console.log(message);
});

// end the input stream and allow the process to exit
pyshell1.end(function (err, code, signal) {
    if (err) throw err;
    console.log('finished');
});