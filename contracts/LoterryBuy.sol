pragma solidity ^0.4.4;

import "./LoterryBase.sol";

contract LoterryBuy is LoterryBase{
    
    uint32 private random1 = 991;
    uint32 private random2 = 9995;
    uint32 private random3 = 99999;

    function getRandom(uint32 idx) internal returns(uint32){
        if(idx==1)
        {
            random1 += random3;
            if (random1>1000000)
            {
                random1 = random1%1000000;
            }
            return random1;
        }
        if(idx==2)
        {
            random2 += random1;
            if (random2>1000000)
            {
                random2 = random2%1000000;
            }
            return random2;
        }
        if(idx==3)
        {
            random3 += random2;
            if (random3>1000000)
            {
                random3 = random3%1000000;
            }
            return random3;
        }
        return 0;
    }
	//create code
    function createCode() private returns(uint32){
        return getRandom(1)%10*100+getRandom(2)%10*10+getRandom(3)%10;
    }
    //send eth to owner
    function sendEthToOwner() private returns(bool){
        //10% of the platform to earn and for the handling fee
        uint256 owner_eth = msg.value*10/100;
        if(!_ceo_address.send(owner_eth)) {
            return false;
        }
        return true;
    }
	//create lottery
    function addPurchaseLottery(uint32 code,uint8 mul) private returns(uint32){
    	PurchasedLottery memory lottery = PurchasedLottery({
            lottery_code: code,
            user_address: msg.sender,
            multiple:mul,
            status:0
        });
        if (cur_period_purchased_lotteries_length>=cur_period_purchased_lotteries.length)
        {
            cur_period_purchased_lotteries.length++;
        }
        cur_period_purchased_lotteries_length++;
        cur_period_purchased_lotteries[cur_period_purchased_lotteries_length-1] = lottery;
        return uint32(cur_period_purchased_lotteries_length-1);
    }
    function buyLotteryByStr(string numbers,uint32 multiple,uint32 count) public whenNotPaused isCanPurchase payable returns(uint32){
        require(count>0);
        require(multiple>0);
        uint256 price = count*getLoterryPrice()*multiple;
        require(msg.value >= price);
        require(sendEthToOwner());
        createCode();
        bytes memory _ba = bytes(numbers);
        uint32[] memory int_arr = new uint32[](count); 
        for (uint32 i=0;i<count;i++)
        {
            uint32 sum = 0;
            for (uint32 m=0;m<3;m++)
            {
                sum = sum*10+(uint32(_ba[i*3+m])-48);
            }
            int_arr[i] = sum;
        }
        for (uint32 j=0;j<count;j++)
        {
            addPurchaseLottery(int_arr[j],uint8(multiple));
        }
        refresh();
        return count;
    }

    function () payable {
    }
}
