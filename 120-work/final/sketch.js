let myPointcloud ;

function setup() {
    myPointcloud = new xPointcloud();
    for(let i = 0; i<100; i++){
        myPointcloud.spawn(random()*100,random()*100) ;
    }

    console.log(myPointcloud.points[0].id) ;
}

function draw() {
    myPointcloud.display() ;
}