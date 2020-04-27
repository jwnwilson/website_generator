const express = require('express');
const exec = require('child_process').exec;

const app = express();
const port = process.env.PORT || 3000;
const deploy = process.env.DEPLOY;

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

app.get('/build', async (req, res) => {
    let totalOutput = '';
    console.log('Building output:');
    execute('npm run build', (output) => {
        console.log('Build output:');
        console.log(output);
        totalOutput += totalOutput;
        
        if (deploy){
            execute('npm run deploy', (output) => {
                console.log('Deploy output:');
                console.log(output);
                totalOutput += totalOutput;
                res.send(totalOutput);
            });
        } else {
            res.send(totalOutput);
        }
        
    });
});

app.listen(port, () => console.log(`Builder app listening on port ${port}!`))