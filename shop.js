'use strict';


function category(){
    fetch('https://fakestoreapi.com/products/categories')
    .then((convert)=>convert.json())
    .then((data)=>{
        document.getElementById('sel').innerHTML='';
          data.unshift('all');
        for(let i of data){
            let op=document.createElement('option');
            op.innerHTML=i;
            op.value=i;
            op.text=i.toUpperCase();
            document.getElementById('sel').appendChild(op);
        }
    }).catch((error)=>{
        console.log(error);
    })
}

function products(){
    fetch('https://fakestoreapi.com/products')
    .then((convert)=>convert.json())
    .then((data)=>{
        let ro=document.getElementById('ro');
        ro.innerHTML='';
        for(let i of data){
            let col=document.createElement('div');
            let card=document.createElement('div');
            col.className='col-md-3 col-6';
            card.className='card shadow';
            card.innerHTML=`
            <img src='${i.image}' width='100%' height='150'>
            <div class='card-footer bg-white d-grid'>
            price:${i.price}<br>
            <button class='btn btn-primary' onclick='cart(${i.id})'>Add</button>
            </div>
            `;
            col.appendChild(card);
            ro.appendChild(col);
            
        }
    })
}


document.getElementById('sel').addEventListener('change',()=>{
    let sel=document.getElementById('sel');
    if(sel.value=='all'){products();}
    else{
    fetch(`http://fakestoreapi.com/products/category/${sel.value}`)
    .then((convert)=>convert.json())
    .then((data)=>{
        
        cat_load(data);
    })
    }
});
function cat_load(data){
    let ro=document.getElementById('ro');
    ro.innerHTML='';
    for(let i of data){
        let col=document.createElement('div');
        let card=document.createElement('div');
        col.className='col-md-3 col-6';
        card.className='card shadow';
        card.innerHTML=`
        <img src='${i.image}'width='100%' height='150' class='card-img-top'>
        <div class='car-body'>
        ${i.price}
        </div>
        <div class='card-footer d-grid'>
        price:${i.price}<br>
        <button class='btn btn-primary' onclick='cart(${i.id})'>Add</button>
        </div>

        `;
        col.appendChild(card);
        ro.appendChild(col);
    }
}
var items=[];
function cart(id){
   let a=id;
    for(let i=0;i<items.length;i++){
        if(items[i].id==a){
            items.splice(i,1);
            
        }
    }

    fetch(`http://fakestoreapi.com/products/${id}`)
    .then((convert)=>convert.json())
    .then((data)=>{
        items.push(data);
        
        modall();
    })
}
function modall(){
countin();
let tb=document.querySelector('tbody');
tb.innerHTML=''    
for(let i of items){
        let tr=document.createElement('tr');
        let td_n=document.createElement('td');
        let td_p=document.createElement('td');
        let td_preview=document.createElement('td');
        let remove=document.createElement('td');
        let pic=document.createElement('img');
        pic.src=i.image;
        pic.height='50';
        pic.width='50';
        td_preview.appendChild(pic);
        remove.innerHTML=`
        <button class='btn btn-close' onclick='remove_item(${i.id})'></button>
        `;
    
        td_n.innerHTML=i.title;
        td_p.innerHTML=i.price;

        tr.appendChild(td_n);
        tr.appendChild(td_p);
        tr.appendChild(td_preview);
        tr.appendChild(remove)
        
        tb.appendChild(tr);
    }
}

function countin(){
    document.getElementById('count').innerHTML=items.length;
    let tot=0;
    for(let i of items){
     tot+=parseFloat(i.price);
    }
    document.getElementById('total').innerHTML=tot;
}

function printt(){
    let backup=document.body.innerHTML;
    let div=document.getElementById('mod_body').innerHTML;
    console.log(div);
    document.body.innerHTML=div;
    window.print();
    document.body.innerHTML=backup;
}


function owl_fetch(parameter){
    fetch(`http://fakestoreapi.com/products/category/${parameter}`)
    .then((convert)=>convert.json())
    .then((data)=>{
        let ro=document.getElementById('ro');
        ro.innerHTML='';
        for(let i of data){
            let col=document.createElement('div');
            let card=document.createElement('div');
            col.className='col-md-3 col-6';
            card.className='card shadow';
            card.innerHTML=`
            <img src='${i.image}'width='100%' height='150' class='card-img-top'>
            <div class='car-body'>
            ${i.price}
            </div>
            <div class='card-footer d-grid'>
            price:${i.price}<br>
            <button class='btn btn-primary' onclick='cart(${i.id})'>Add</button>
            </div>
    
            `;
            col.appendChild(card);
            ro.appendChild(col);
        }
        
    })
    
}

function remove_item(id){
    
    for(let i=0;i<items.length;i++){
        if(id==items[i].id){
            items.splice(i,1);
        }
        modall();
        countin();
    }
}


function load(){
    category();
    products();
    countin();

}