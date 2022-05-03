const bcrypt = require('bcrypt');

async function run(){
    const salt = await bcrypt.genSalt(10);
    const home = {"fire":"ground"}
    const hash = await bcrypt.hash(home.fire, salt)
    console.log(hash);
}

run()