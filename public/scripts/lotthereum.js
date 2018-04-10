function LJRaise() {
    this.contract = web3.eth.contract([{"constant":true,"inputs":[{"name":"idx","type":"uint32"}],"name":"getRaises","outputs":[{"name":"","type":"uint32"},{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"all_period_finished_lotteries_length","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pre_winning_number","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"numbers","type":"string"},{"name":"multiple","type":"uint32"},{"name":"count","type":"uint32"}],"name":"buyLotteryByStr","outputs":[{"name":"","type":"uint32"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"first_reward_lottery_num","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cur_period_status","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"isCanBuy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getWinNum","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pauseProgram","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cur_period_purchased_lotteries_length","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"doSendCurPeriodRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"second_reward_eth_num","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"third_reward_eth_num","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"idx","type":"uint32"}],"name":"getwins","outputs":[{"name":"","type":"uint32"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"uint8"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"third_reward_lottery_num","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_ceo_address","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cur_period_num","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRaisesIdsByOwner","outputs":[{"name":"ids","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sendCurPeriodRewards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"period","type":"uint32"}],"name":"getWinNumber","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resumeProgram","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurRewardsNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLoterryPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"startNewPeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ad","type":"address"}],"name":"setCEOAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getWinIdsByOwner","outputs":[{"name":"ids","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPurchasedNum","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"all_lottery_num","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"all_period_finished_lotteries","outputs":[{"name":"lottery_code","type":"uint32"},{"name":"user_address","type":"address"},{"name":"win_price","type":"uint256"},{"name":"multiple","type":"uint8"},{"name":"level","type":"uint8"},{"name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"second_reward_lottery_num","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"first_reward_eth_num","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stopCurPeriodBuy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRaisesNum","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[],"name":"refresh","type":"event"}]);

    this.contractInstance = this.contract.at(window.contract_address);
    var self = this;
    this.cur_period_num = 0;
    this.cur_period_status = 0;
    this.last_period_num = 0;
    this.first_num = -1;
    this.second_num = -1;
    this.third_num = -1;

    this.init = function () {
        self.account = null;
        web3.eth.getAccounts(function(error, accounts) {
                        var account = null;
                        accounts.forEach(function(_account) {
                            if (account == null) {
                                account = _account;
                            }
                            // $('#dropdown-nav').append('<li class="valign-wrapper"><a href="#!' + _account + '" class="accounts_dropdown_item">'  + _account + '</a></li>');
                        });
                        if (account != null) {
                            self.changeAccount(account)
                            // $('#avatar').css('display', 'block');
                        } else {
                            console.log('No accounts found!');
                            // $('#alert1').modal('open');
                        }
                        // $('select').material_select();
                        $('.accounts_dropdown_item').click(function() {
                            var newValue = $(this).attr('href').replace('#!', '');
                            console.log(newValue);
                            self.changeAccount(newValue)
                        });
                    });
        // alert("123");
        self.contractInstance.cur_period_num(function(error, result) {
            if (error) {
                console.log('ERROR:');
                console.log(error);
            } else {
                console.log("ddd===23233")
                console.log(result)
                console.log(result.valueOf());
                self.cur_period_num = result.valueOf();
                $("#cur_period_num_txt").html("Current Period (period " + result.valueOf() +")");
                $("#expect_tab").html("Current Period (period " + result.valueOf() +")");

                self.contractInstance.getCurRewardsNum(function(error, result1) {
                    $("#jiangjincinum").html(web3.fromWei(result1.valueOf())+ "&nbsp;&nbsp;eth");
                });
                self.contractInstance.cur_period_status(function(error, result2) {
                    self.cur_period_status = result2.valueOf();
                    if (self.cur_period_status==1){
                        self.last_period_num = self.cur_period_num-1;
                        $("#cur_period_status_lable").html("<font style='color:#00FF00;'>Normal</font>");
                    }else
                    {
                        self.last_period_num = self.cur_period_num;
                        $("#cur_period_status_lable").html("Being Awarded");
                    }
                    $("#Winning_Numbers").html("&nbsp;&nbsp;period " +self.last_period_num +" numbers");
                    console.log("self.contractInstance.cur_period_num initCurPeriodList");
                    self.initCurPeriodList();
                });
            }
        });
        self.contractInstance.pre_winning_number(function(error, result1) {
            var num = result1.valueOf();
            var num1 = Math.floor(num/100);
            var num2 = Math.floor(num/10)%10;
            var num3 = Math.floor(num)%10;
            self.first_num = num1;
            self.second_num = num2;
            self.third_num = num3;
            $("#last_period_number1").html(num1);
            $("#last_period_number2").html(num2);
            $("#last_period_number3").html(num3);
        });
        self.contractInstance.all_lottery_num(function(error, result1) {
            var all = result1.valueOf();
            self.contractInstance.first_reward_lottery_num(function(error, result) {
                var num = result.valueOf();
                $("#first_reward_lottery_num").html(num);
            });
            self.contractInstance.first_reward_eth_num(function(error, result) {
                var num = result.valueOf();
                $("#first_reward_eth_num").html(web3.fromWei(num));
            });

            self.contractInstance.second_reward_lottery_num(function(error, result) {
                var num = result.valueOf();
                $("#second_reward_lottery_num").html(num);
            });
            self.contractInstance.second_reward_eth_num(function(error, result) {
                var num = result.valueOf();
                $("#second_reward_eth_num").html(web3.fromWei(num));
            });

            self.contractInstance.third_reward_lottery_num(function(error, result) {
                var num = result.valueOf();
                $("#third_reward_lottery_num").html(num);
            });
            self.contractInstance.third_reward_eth_num(function(error, result) {
                var num = result.valueOf();
                $("#third_reward_eth_num").html(web3.fromWei(num));
            });
        });
        // $('#zhx_pt_jx').click(function() {
            
        // });
    }
    this.onBuy = function(eth,multiple,numbers) {
        console.log(eth,multiple,numbers);
        var number_arr = numbers.split(",");
        var number_int = [];
        var count = 0;
        var numbers_str = "";
        for (var i = number_arr.length - 1; i >= 0; i--) {
            var arr = number_arr[i].split("|");
            numbers_str = numbers_str+arr[0]+arr[1]+arr[2];
            count++;
        }
        console.log(numbers_str);
        console.log("GGGGGGGGGGGGG");
        self.contractInstance.isCanBuy.call(function(error, result1)
            {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    if (result1.valueOf()==false)
                    {
                        alert("Please wait for the new one to open!")
                        return;
                    }
                    

                    var gas = 50000;
                    var value = web3.toWei(eth, 'ether');
                    // console.log("GGGGGGGGGGGGG1",number_int,multiple,count); ,
                    //string numbers,uint32 multiple,uint32 count
                    // console.log(numbers_str,multiple,count);
                    self.contractInstance.buyLotteryByStr(numbers_str,multiple,count,{from:self.account,value: value, gas: gas},function(error, result) {
                        if (error) {
                            // console.log("GGGGGGGGGGGGG12",number_int,multiple,count);
                            // console.log('ERROR:');
                            // console.log(error);
                        } else {
                            // console.log("ddd===")
                            // console.log(result.valueOf());
                            self.refresh()
                            // console.log(result[0].valueOf(),result[1].valueOf(),result[2].valueOf())
                        }
                    });

            }); 
    }
    this.changeAccount = function (address) {
        self.account = address;
        // $('#current_account_number').html(self.account);
        // self.getBalance();
    }
    this.initCurPeriodList = function() {
        // console.log("self.cur_period_status",self.cur_period_status)
        if (self.cur_period_status==1)
        {
            self.contractInstance.getRaisesIdsByOwner(function(error, results)
            {
                var ids = [];
                results.forEach(function(id) {
                                ids.push(id);
                            });
                $("#tidian").html("");
                for (var i = ids.length - 1; i >= 0; i--) {
                    self.contractInstance.getRaises(ids[i],function(error, results)
                    {
                        // console.log(results);
                        // console.log(results[0].valueOf())
                        var num = results[0].valueOf();
                        var num1 = Math.floor(num/100);
                        var num2 = Math.floor(num/10)%10;
                        var num3 = Math.floor(num)%10;

                        $('#tidian').append(`<li>
                                        <dd class="clearfix">
                                            <span class="l">
                                                <b class="b-org-20">`+num1+`</b>
                                                <b class="b-org-20">`+num2+`</b>
                                                <b class="b-org-20">`+num3+`</b>            
                                            </span>
                                            <span style="color:#b1b1b1">&nbsp;&nbsp;x`+results[3].valueOf()+`</span>
                                        </dd>
                                    </li>`);
                    });
                };
            });
        }
        self.contractInstance.getWinIdsByOwner(function(error, results)
        {
            var ids = [];
            results.forEach(function(id) {
                            ids.push(id);
                        });
            $("#tidian_rewards").html("");
            for (var i = ids.length - 1; i >= 0; i--) {
                self.contractInstance.getwins(ids[i],function(error, results)
                {
                    // console.log(results);
                    // console.log(results[0].valueOf())
                    // console.log(results[2].valueOf())
                    var num = results[0].valueOf();
                    var num1 = Math.floor(num/100);
                    var num2 = Math.floor(num/10)%10;
                    var num3 = Math.floor(num)%10;
                    var mul = results[4].valueOf();
                    var money = web3.fromWei(results[2].valueOf()) +"";
                    var str1="";
                    var str2="";
                    var str3="";
                    if (num1==self.first_num)
                    {
                        str1 = `<span class="b-blue-20" style="display:inline-block;line-height:20px;height:20px;margin-right:0px;">`+num1+`</span>`;
                    }else
                    {
                        str1 = `<span class="b-red-20" style="display:inline-block;line-height:20px;height:20px;margin-right:0px;">`+num1+`</span>`;
                    }
                    if (num2==self.second_num)
                    {
                        str2 = `<span class="b-blue-20" style="display:inline-block;line-height:20px;height:20px;margin-right:0px;">`+num2+`</span>`;
                    }else
                    {
                        str2 = `<span class="b-red-20" style="display:inline-block;line-height:20px;height:20px;margin-right:0px;">`+num2+`</span>`;
                    }
                    if (num3==self.third_num)
                    {
                        str3 = `<span class="b-blue-20" style="display:inline-block;line-height:20px;height:20px;margin-right:0px;">`+num3+`</span>`;
                    }else
                    {
                        str3 = `<span class="b-red-20" style="display:inline-block;line-height:20px;height:20px;margin-right:0px;">`+num3+`</span>`;
                    }
                    moeny = money.substr(0,money.indexOf(".")+5);
                    $('#tidian_rewards').append(`<li style="margin-bottom:5px;">
                                    <dd class="clearfix">
                                        <span class="l">
                                            `+str1+`
                                            `+str2+`
                                            `+str3+`            
                                        </span>
                                        <span style="color:#b1b1b1">&nbsp;&nbsp;x`+mul+`</span>
                                        <span>
                                        Amount:`+ web3.fromWei(results[2].valueOf()) +`
                                        </span>
                                    </dd>
                                </li>`);
                });
            };
        });
        
    }
    this.refresh = function (error, event) {
        // console.log("refreshrefreshrefreshrefreshrefresh");
        window.location.reload();
    }

    this.initEvents = function () {
        var currentBlockNumber = 0;
        web3.eth.getBlockNumber(function(error, result){
            if(!error)
                currentBlockNumber = result;
            else
                console.error(error);

            var range = {fromBlock: currentBlockNumber, toBlock: 'latest'};
            self.betPlacedEvent = self.contractInstance.refresh(range);
            self.betPlacedEvent.watch(self.refresh);
        })
    }

    
    this.init();
    this.initEvents();
    // this.initAccounts();
}

