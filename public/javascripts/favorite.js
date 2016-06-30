// var user;
$(document).ready(function(){
    $('.star').click(function(){
        $(this).addClass("favorite")
    });
})

// $.get('/favorite/getUserId').done(id =>{
//     user=id;
//     console.log(user);
//
//     $('.star').click(function(){
//       getLocId()
//         console.log(location.name);
//         $.post('/favorite',{
//             contributor_id: user,
//             location_id: this.id
//         })
//         event.preventDefault();
//     })
// })
