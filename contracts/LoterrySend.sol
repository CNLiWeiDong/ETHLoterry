pragma solidity ^0.4.4;

import "./LoterryBuy.sol";

contract LoterrySend is LoterryBuy{
  	//start new period
    function startNewPeriod() public onlyOwner whenNotPaused {
        if (cur_period_status>0 && cur_period_status<4)
        {
            return;
        }
        cur_period_status = 1;
        cur_period_num++;
        //delete cur_period_purchased_lotteries;
        cur_period_purchased_lotteries_length = 0;
    }

    //stop buying
    function stopCurPeriodBuy() public onlyOwner whenNotPaused {
        if (cur_period_status!=1)
        {
            return;
        }
        cur_period_status = 2;
    }
    function pushFinishedLotteries(FinishedLottery lottery) private {
        if (all_period_finished_lotteries_length>=all_period_finished_lotteries.length)
        {
            all_period_finished_lotteries.length++;
        }
        all_period_finished_lotteries_length++;
        all_period_finished_lotteries[all_period_finished_lotteries_length-1] = lottery;
    }
    //begin send rewards
    struct CalculateData {
        uint32 first_num;
        uint32 second_num;
        uint32 third_num;
        FinishedLottery[] first_array;
        FinishedLottery[] second_array;
        FinishedLottery[] third_array;
        FinishedLottery[] fourth_array;
        uint32 first_arr_count;
        uint32 second_arr_count;
        uint32 third_arr_count;
        uint32 fourth_array_count;
        uint32 first_arr_money_count;
        uint32 second_arr_money_count;
        uint32 third_arr_money_count;
        uint256 first_reward; 
        uint256 second_reward; 
        uint256 third_reward;
    }
    function sendCurPeriodRewards() public onlyOwner whenNotPaused {
        require(cur_period_status==2);
        uint256 t_prize_pool = this.balance; //getCurRewardsNum();
        CalculateData memory data = CalculateData({
                    first_num: getRandom(3)%10,
                    second_num: getRandom(2)%10,
                    third_num: getRandom(1)%10,
                    first_array: new FinishedLottery[](cur_period_purchased_lotteries_length),
                    second_array: new FinishedLottery[](cur_period_purchased_lotteries_length),
                    third_array: new FinishedLottery[](cur_period_purchased_lotteries_length),
                    fourth_array: new FinishedLottery[](cur_period_purchased_lotteries_length),
                    first_arr_count: 0,
                    second_arr_count: 0,
                    third_arr_count: 0,
                    fourth_array_count: 0,
                    first_arr_money_count: 0,
                    second_arr_money_count: 0,
                    third_arr_money_count: 0,
                    first_reward:t_prize_pool*30/100,
                    second_reward:t_prize_pool*20/100,
                    third_reward:t_prize_pool*50/100
                });
        
        for (uint32 i=0;i<cur_period_purchased_lotteries_length;i++)
        {
            PurchasedLottery storage sold_lottery = cur_period_purchased_lotteries[i];
            if (sold_lottery.status==0)
            {
                uint8 level = 0;
                FinishedLottery memory lottery = FinishedLottery({
                    lottery_code: sold_lottery.lottery_code,
                    user_address: sold_lottery.user_address,
                    win_price: 0,
                    multiple:sold_lottery.multiple,
                    level:0,
                    status:false
                });
                if(lottery.lottery_code/100==data.first_num)
                {
                    level ++;
                }
                if((lottery.lottery_code%100)/10==data.second_num)
                {
                    level ++;
                }
                if(lottery.lottery_code%10==data.third_num)
                {
                    level ++;
                }
                lottery.level = level;

                if (level==0)
                {
                    data.fourth_array[data.fourth_array_count++] = lottery;
                }
                if (level==1)
                {
                    data.third_array[data.third_arr_count++] = lottery;
                    data.third_arr_money_count = data.third_arr_money_count+lottery.multiple;
                }
                if (level==2)
                {
                    data.second_array[data.second_arr_count++] = lottery;
                    data.second_arr_money_count +=lottery.multiple;
                }
                if (level==3)
                {
                    data.first_array[data.first_arr_count++] = lottery;
                    data.first_arr_money_count +=lottery.multiple;
                }
            }
        }
        
        pre_winning_numbers[cur_period_num] = data.first_num*100+data.second_num*10+data.third_num;
        pre_winning_number = data.first_num*100+data.second_num*10+data.third_num;
        //delete all_period_finished_lotteries;
        all_period_finished_lotteries_length = 0;

        all_lottery_num = data.first_arr_count+data.second_arr_count+data.third_arr_count+data.fourth_array_count;
        first_reward_lottery_num = data.first_arr_count;
        second_reward_lottery_num = data.second_arr_count;
        third_reward_lottery_num = data.third_arr_count;
    
        if (data.first_arr_count>0)
        {
            data.first_reward = data.first_reward/data.first_arr_money_count;
            first_reward_eth_num = data.first_reward;
            for (uint32 m=0;m<data.first_arr_count;m++)
            {
                data.first_array[m].win_price = data.first_reward*data.first_array[m].multiple;
                pushFinishedLotteries(data.first_array[m]);
                //all_period_finished_lotteries.push(data.first_array[m]);
            }
        }
        if (data.second_arr_count>0)
        {
            data.second_reward = data.second_reward/data.second_arr_money_count;
            second_reward_eth_num = data.second_reward;
            for (uint32 n=0;n<data.second_arr_count;n++)
            {
                data.second_array[n].win_price = data.second_reward*data.second_array[n].multiple;
                pushFinishedLotteries(data.second_array[n]);
            }
        }
        if (data.third_arr_count>0)
        {
            data.third_reward = data.third_reward/data.third_arr_money_count;
            third_reward_eth_num = data.third_reward;
            for (uint32 x=0;x<data.third_arr_count;x++)
            {
                data.third_array[x].win_price = data.third_reward*data.third_array[x].multiple;
                pushFinishedLotteries(data.third_array[x]);
            }
        }
        if (data.fourth_array_count>0)
        {
            for (uint32 y=0;y<data.fourth_array_count;y++)
            {
                pushFinishedLotteries(data.fourth_array[y]);
            }
        }

        //t_prize_pool = 0;
        if (data.first_arr_count==0)
        {
            first_reward_eth_num = 0;
        }
        if (data.second_arr_count==0)
        {
            second_reward_eth_num = 0;
        }
        if (data.third_arr_count==0)
        {
            third_reward_eth_num = 0;
        }
        //prize_pool = t_prize_pool;
        cur_period_status = 3;
    }
    function doSendCurPeriodRewards() public onlyOwner whenNotPaused {
        require(cur_period_status==3);
        for (uint32 i=0;i<all_period_finished_lotteries_length;i++)
        {
            FinishedLottery storage finished_lottery = all_period_finished_lotteries[i];
            if (finished_lottery.win_price>0 && !finished_lottery.status)
            {
                if(!finished_lottery.user_address.send(finished_lottery.win_price)) {
                    return;
                }else
                {
                    finished_lottery.status = true;
                }
            }
            
        }
        cur_period_status = 4;
    }
    //get current period rewards num
    function getCurRewardsNum() public view whenNotPaused returns(uint256)
    {
        return this.balance;
        /*
        uint32 sum = 0;
        for (uint32 i=0;i<cur_period_purchased_lotteries_length;i++)
        {
            PurchasedLottery storage sold_lottery = cur_period_purchased_lotteries[i];
            if (sold_lottery.status==0)
            {
                sum ++;
            }
        }
        uint256 num = getLoterryPrice();
        num = num*sum;
        //1% for the handling fee, 10% of the platform to earn
        num = num-num*11/100;
        return prize_pool + num;
        */
    }
}
