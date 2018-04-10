pragma solidity ^0.4.4;

import "./LoterrySend.sol";

contract LoterryCenter is LoterrySend{
    function getRaisesNum() public view returns(uint32){
        return uint32(cur_period_purchased_lotteries_length);
    }
    function getRaisesIdsByOwner() constant returns(uint[] memory ids) {
        uint32 num = 0;
        for (uint32 i = 0; i < cur_period_purchased_lotteries_length; i++) {
            if (cur_period_purchased_lotteries[i].user_address==msg.sender)
            {
                num++;
            }
        }
        ids = new uint[](num);
        uint32 idx = 0;
        for (uint32 j = 0; j < cur_period_purchased_lotteries_length; j++) {
            if (cur_period_purchased_lotteries[j].user_address==msg.sender)
            {
                ids[idx++] = j;
            }
        }
    }
	function getRaises(uint32 idx) public view returns(uint32,address,uint8,uint8){
        PurchasedLottery storage item = cur_period_purchased_lotteries[idx];
        return(item.lottery_code,item.user_address,item.status,item.multiple);
	}

    function getWinNum() public view returns(uint32){
        return uint32(all_period_finished_lotteries.length);
    }
    function getWinIdsByOwner() constant returns(uint[] memory ids) {
        uint32 num = 0;
        for (uint32 i = 0; i < all_period_finished_lotteries.length; i++) {
            if (all_period_finished_lotteries[i].user_address==msg.sender)
            {
                num++;
            }
        }
        ids = new uint[](num);
        uint32 idx = 0;
        for (uint32 j = 0; j < all_period_finished_lotteries.length; j++) {
            if (all_period_finished_lotteries[j].user_address==msg.sender)
            {
                ids[idx++] = j;
            }
        }
    }
	function getwins(uint32 idx) public view returns(uint32,address,uint256,bool,uint8,uint8){
        FinishedLottery storage item = all_period_finished_lotteries[idx];
		return(item.lottery_code,item.user_address,item.win_price,item.status,item.multiple,item.level);
	}

}