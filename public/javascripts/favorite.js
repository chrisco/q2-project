// var user;
$(document).ready(function(){
    $('.star').click(function(){
        $(this).addClass("favorite")
    });
})

// $.get('/favorite/getId').done(id =>{
//     user=id;
//     console.log(user);
//
//     $('.star').click(function(){
//         console.log(location.name);
//         $.post('/favorite',{
//             contributor_id: user,
//             location_id: this.id
//         })
//         event.preventDefault();
//     })
// })
