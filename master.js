(function(){
    var tickets,draws,money_spent,balance, available_numbers_master;
    var ticket_size = 7,
        ticket_number_max = 49;

    function buyTicket(amount){

        if(document.getElementById('tickets').innerHTML != ""){
            document.getElementById('tickets').innerHTML = "";
        }

        for(var i=0; i < amount; i++){
            if(balance >= 5) {
                tickets.push(generateTicket());
                balance -= 5;
            }
        }

        updateUI();
    }

    function generateTicket() {
        var available_numbers = shuffle(available_numbers_master.slice(0));
        var new_ticket = [];
        var ticket_html = "";
        var tickets_parent = document.getElementById('tickets');

        for(var i=0; i < ticket_size; i++){
            new_ticket.push(available_numbers.splice(Math.floor(Math.random() * available_numbers.length), 1)[0]);
        }

       new_ticket.sort(function (a, b) {
            if (a < b) {
                return -1;
            }
            if (b < a) {
                return 1;
            }
            return 0;
        });

        new_ticket.forEach(function(ele,index){
            ticket_html += "<span>" +  new_ticket[index] + "</span>";
        });

        tickets_parent.insertAdjacentHTML("beforeend", "<div class=\"ticket\">" + ticket_html + "</div>");
        return new_ticket;
    }

    function skipWeek(){

    }

    function getPrizePercent(percent){
        return Math.floor(jackpot / 100) * percent;
    }

    function draw(){
        // draw winning number..
        var winning_ticket = generateTicket();
        var tickets_parent = document.getElementById('tickets');
        tickets_parent.innerHTML = "";

        // first check if player won..
        tickets.forEach(function(ticket){
            var matches = 0;
            var ticket_html = "";

            ticket.forEach(function(number){
                if (winning_ticket.indexOf(number) != -1){
                    matches += 1;
                    ticket_html += "<span class=\"match\">" + number + "</span>";
                }else{
                    ticket_html += "<span>" + number + "</span>";
                }
            });



            switch(matches){
                case(3):
                    balance += 5;
                    tickets_parent.insertAdjacentHTML("beforeend", "<div class=\"ticket winner1\">" + ticket_html + "</div>");
                    break;

                case(4):
                    balance += 20;
                    tickets_parent.insertAdjacentHTML("beforeend", "<div class=\"ticket winner2\">" + ticket_html + "</div>");
                    break;

                case(5):
                    balance += getPrizePercent(1.5);
                    tickets_parent.insertAdjacentHTML("beforeend", "<div class=\"ticket winner3\">" + ticket_html + "</div>");
                    break;

                case(6):
                    balance += getPrizePercent(3.5);
                    tickets_parent.insertAdjacentHTML("beforeend", "<div class=\"ticket winner4\">" + ticket_html + "</div>");
                    break;

                case(7):
                    balance += getPrizePercent(95);
                    tickets_parent.insertAdjacentHTML("beforeend", "<div class=\"ticket winner5\">" + ticket_html + "</div>");
                    break;

                default:
                    tickets_parent.insertAdjacentHTML("beforeend", "<div class=\"ticket loser\">" + ticket_html + "</div>");
            }
        });

        // then check if anyone else won..

        tickets = [];
        updateUI();
    }

    function updateUI(){
        document.getElementById('stats_draws').innerText = draws;
        document.getElementById('stats_spent').innerText = money_spent;
        document.getElementById('stats_balance').innerText = balance;
        document.getElementById('jackpot').innerText = jackpot;
    }

    function init(){
        // Set inital variables
        tickets = [];
        available_numbers_master = [];
        draws = 0;
        money_spent = 0;
        balance = 500;
        jackpot = 15000000;

        // set game button listeners..
        document.getElementById('buy_one').addEventListener('click', function(){buyTicket(1);});
        document.getElementById('buy_five').addEventListener('click',function(){buyTicket(5);});
        document.getElementById('buy_ten').addEventListener('click', function(){buyTicket(10);});
        document.getElementById('skip_week').addEventListener('click', function(){skipWeek()});
        document.getElementById('draw').addEventListener('click', function(){draw()});

        // update the UI to reflect new game variable values..
        updateUI();

        // generate available numbers array
        for(var i=1; i < ticket_number_max; i++){
            available_numbers_master.push(i);
        }
    }

    window.onload = init;
}());


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}