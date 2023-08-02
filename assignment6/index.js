const childProcess = require('child_process');

process.stdin.on("data", input => {
    command = input.toString().trim();
    if(command == 'exit') 
        process.exit();
    childProcess.exec(command, (err,stdout,stderr) => { 
        if(err) {
            console.log(err);
            return;
        }
        if(stderr) {
            console.log(stderr);
            return;
        }

        console.log(stdout);
    })

    // other syntax
    // const res = childProcess.spawn(command, {shell: true});
    // res.stdout.on('data', (data) => {
    //     console.log(data.toString());
    //     console.log('output');
    // })

})

