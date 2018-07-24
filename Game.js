/**
 * Created by VibhorDhingra on 29-07-2017.
 */
var clicks=0;
var j=0;
var done1=0;
var done2=0;
var done3=0;
var done4=0;
var done5=0;
var done6=0;
var done7=0;
var done8=0;
var done9=0;



$(function () {
    let box1 = $('#1');
    let box2 = $('#2');
    let box3 = $('#3');
    let box4 = $('#4');
    let box5 = $('#5');
    let box6 = $('#6');
    let box7 = $('#7');
    let box8 = $('#8');
    let box9 = $('#9');
    let loginbtn = $('#login_btn');
    let signupbtn = $('#signup_btn');
    let player1 = $('#player1');
    let player2 = $('#player2');
    let username1=$('#username1');
    let password1=$('#password1');
    let username2=$('#username2');
    let password2=$('#password2');
    loginbtn.click(function () {
        console.log('Login clicked!');
        loginbtn.css('display', 'none');
        player1.css('display', 'block');
        player2.css('display', 'block');
    });
    signupbtn.click(function () {
        console.log('Sign Up clicked!');
        ($('#signup')).css('display', 'block');
    })
    let submitnew = $('#submitnew');
    let submit = $('#submitdetails');
    submit.click(function () {
        console.log('Submit Clicked!');
        player1.css('display', 'none');
        player2.css('display', 'none');
        //$('.game').css('display','block');

        if(username1.val()!='' && password1.val()!='' && username2.val()!='' && password2.val()!=''){
        $.post('/checkdetails', {username1:username1.val(), pass1:password1.val(), username2:username2.val(), pass2:password2.val()},
            function (data) {
                if(data.success){
                    console.log(data.ro1);
                    console.log(data.ro2);
                    if(!data.ro1 || !data.ro2)
                    {
                        window.alert('Username/Password is incorrect');
                        window.location.replace('/');
                    }
                    else {
                        $('.gamee').css('display','block');
                        //$('#game1').css('display', 'block');
                        //$('#game2').css('display', 'block');
                        //$('#game3').css('display', 'block');
                    }
                }
                else
                {
                    window.alert('Username/Password is incorrect');
                    window.location.replace('/');
                }
            })
        }
        else
        {
            window.alert('Please fill all the fields');
        }

    });
    submitnew.click(function () {
        let newname = $('#newname');
        let newusername = $('#newusername');
        let newpass = $('#newpassword');
        if (newusername.val() != '' && newpass.val() != '' && newpass.val() != '') {
            console.log("Name:" + newname.val());
            $.post('/usersignup', {name: newname.val(), username: newusername.val(), pass: newpass.val()},
                function (data) {
                    if (data.success) {
                        window.alert('You have registered successfully! Please log in to play the game!');
                        window.location.replace('/');
                    }
                }
            );
        }
        else {
            window.alert('Please fill all the fields and try again');
            //window.location.replace('/');
        }
    });
    let leaderboard=$('#Leaderboard');
    let thanks=$('#thanks');
    let ll=$('#Leaderboardlist');
    var lcount=0;
    let leaderlist = $('#leaderlist');
    let original = leaderlist.html();
    leaderboard.click(function(){
        if(lcount%2==0) {
            console.log('Leaderboard Clicked!');
            $.post('/leader', {},
                function (data) {

                    console.log(data.rows);
                    let temp="";
                    for (let i in data.rows) {
                        console.log(data.rows[i].name);
                         temp+='<tr><td>' + data.rows[i].name + '</td><td>' + data.rows[i].wins + '</td><td>' + data.rows[i].draws + '</td><td>' + data.rows[i].losses + '</td></tr>';
                    }
                    leaderlist.html(original+temp);
                    ll.css('display', 'block');
                });
        }
        else
        {
            ll.css('display','none');
        }
        lcount++;
        //window.location.replace('/Leaderboard.html');
    })

    box1.click(function () {


        var done = 0;
        console.log('click1');
        box1.attr('align', 'center')
        box1.css('font-size', 110);
        if (done1 == 0) {
            clicks++;
            if (j == 1) {
                box1.text('X');
                j = 0;
                done1 = 2;
            }
            else {
                box1.text('O');
                j = 1;
                done1 = 1;
            }
            if (clicks >= 5) {
                var x = done1;

                if ((x == done2 && x == done3) || (x == done5 && x == done9) || (x == done4 && x == done7)) {
                    console.log('Player ' + x + ' has won');

                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display','none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);
                }

            }
            else if (clicks == 9) {
                console.log('Draw');
                $('.gamee').css('display','none');
                $.post('/updatedraw',{name1:username1.val(), name2:username2.val()},
                    function (data) {
                        if(data.success){
                            thanks.html(thanks.html()+' Its a draw!');
                            thanks.css('display','block');
                        }
                    })
                window.setTimeout(function () {
                    window.location.replace('/');
                },800);

            }
        }
        else
        {
            console.log('Illegal Click!');
        }

    })
    box2.click(function () {

        console.log('click2');
        box2.attr('align', 'center')
        box2.css('font-size', 110);
        if (done2 == 0) {
            clicks++;
            if (j == 1) {
                box2.text('X');
                j = 0;
                done2 = 2;
            }
            else {
                box2.text('O');
                j = 1;
                done2 = 1;
            }
            if (clicks >= 5) {
                var x = done2
                if ((x == done5 && x == done8) || (x == done1 && x == done3)) {
                    console.log('Player ' + x + ' has won');
                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);
                }

                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }


    })
    box3.click(function () {

        var done = 0;
        console.log('click3');
        box3.attr('align', 'center')
        box3.css('font-size', 110);
        if (done3 == 0) {
            clicks++;
            if (j == 1) {
                box3.text('X');
                j = 0;
                done3 = 2;
            }
            else {
                box3.text('O');
                j = 1;
                done3 = 1;
            }
            if (clicks >= 5) {
                var x = done3
                if ((x == done5 && x == done7) || (x == done6 && x == done9) || (x == done1 && x == done2)) {
                    console.log('Player ' + x + ' has won');
                    //window.open('index.html')
                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }
    })
    box4.click(function () {

        console.log('click4');
        box4.attr('align', 'center')
        box4.css('font-size', 110);
        if (done4 == 0) {
            clicks++;
            if (j == 1) {
                box4.text('X');
                j = 0;
                done4 = 2;
            }
            else {
                box4.text('O');
                j = 1;
                done4 = 1;
            }
            if (clicks >= 5) {
                var x = done4
                if ((x == done5 && x == done6) || (x == done1 && x == done7)) {
                    console.log('Player ' + x + ' has won');
                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }

    })
    box5.click(function () {
        var done = 0;
        console.log('click3');
        box5.attr('align', 'center')
        box5.css('font-size', 110);
        if (done5 == 0) {
            clicks++;
            if (j == 1) {
                box5.text('X');
                j = 0;
                done5 = 2;
            }
            else {
                box5.text('O');
                j = 1;
                done5 = 1;
            }
            if (clicks >= 5) {
                var x = done5
                if ((x == done3 && x == done7) || (x == done1 && x == done9) || (x == done8 && x == done2) || (x == done4 && x == done6)) {
                    console.log('Player ' + x + ' has won');
                    //window.open('index.html')
                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }
    })
    box6.click(function () {


        var done = 0;
        console.log('click6');
        box6.attr('align', 'center')
        box6.css('font-size', 110);
        if (done6 == 0) {
            clicks++;
            if (j == 1) {
                box6.text('X');
                j = 0;
                done6 = 2;
            }
            else {
                box6.text('O');
                j = 1;
                done6 = 1;
            }
            if (clicks >= 5) {
                var x = done6
                if ((x == done5 && x == done9) || (x == done4 && x == done5)) {
                    console.log('Player ' + x + ' has won');
                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }



    })
    box7.click(function () {


        var done = 0;
        console.log('click7');
        box7.attr('align', 'center')
        box7.css('font-size', 110);
        if (done7 == 0) {
            clicks++;
            if (j == 1) {
                box7.text('X');
                j = 0;
                done7 = 2;
            }
            else {
                box7.text('O');
                j = 1;
                done7 = 1;
            }
            if (clicks >= 5) {
                var x = done7
                if ((x == done4 && x == done1) || (x == done8 && x == done9) || (x == done5 && x == done3)) {
                    console.log('Player ' + x + ' has won');


                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }

    })
    box8.click(function () {
        if (clicks == 9) {
            console.log('Draw')
        }
        var done = 0;
        console.log('click8');
        box8.attr('align', 'center')
        box8.css('font-size', 110);
        if (done8 == 0) {
            clicks++;
            if (j == 1) {
                box8.text('X');
                j = 0;
                done8 = 2;
            }
            else {
                box8.text('O');
                j = 1;
                done8 = 1;
            }
            if (clicks >= 5) {
                var x = done8
                if ((x == done5 && x == done2) || (x == done7 && x == done9)) {
                    console.log('Player ' + x + ' has won');

                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }


    });
    box9.click(function () {

        var done = 0;
        console.log('click9');
        box9.attr('align', 'center')
        box9.css('font-size', 110);
        if (done9 == 0) {
            clicks++;
            if (j == 1) {
                box9.text('X');
                j = 0;
                done9 = 2;
            }
            else {
                box9.text('O');
                j = 1;
                done9 = 1;
            }
            if (clicks >= 5) {
                var x = done9
                if ((x == done5 && x == done1) || (x == done6 && x == done3) || (x == done7 && x == done8)) {
                    console.log('Player ' + x + ' has won');
                    let winner = username2.val(), loser = username1.val();
                    if (x == 1) {
                        winner = username1.val();
                        loser = username2.val();
                    }
                    $('.gamee').css('display', 'none');
                    $.post('/updatewins', {wUsername: winner, lUsername: loser},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + data.row.name + ' has won!');
                                thanks.css('display', 'block');
                            }
                        });
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
                else if (clicks == 9) {
                    console.log('Draw');
                    $('.gamee').css('display', 'none');
                    $.post('/updatedraw', {name1: username1.val(), name2: username2.val()},
                        function (data) {
                            if (data.success) {
                                thanks.html(thanks.html() + ' Its a draw!');
                                thanks.css('display', 'block');
                            }
                        })
                    window.setTimeout(function () {
                        window.location.replace('/');
                    }, 800);

                }
            }
        }
        else
        {
            console.log('Illegal Click!');
        }
    })
})








































//var cross=$('<p>');
// var circle=$('<p>');
// cross.css('margin-left','45px')
// circle.css('margin-left','45px')
// //cross.css('padding-bottom','190px')
// if(j==0) {
//     circle.text('O');
//     j=1;
// }
// else {
//     cross.text('X');
//     j=0;
//     circle.hide()
// }
// cross.css('font-size',120)
// circle.css('font-size',120)
// box1.append(cross)
// box1.append(circle)