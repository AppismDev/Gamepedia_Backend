exports.getAccessToken = async ()=>{

    const {rtdb} = require("../admin/admin");

    let token = {};

    let dbRef = rtdb.ref();

    await dbRef.child("igdb").once('value',(snapshot)=>{
        let tokenInfo = snapshot.val();
        token = {...tokenInfo};
        console.log(token);
    })

    return token;
}

