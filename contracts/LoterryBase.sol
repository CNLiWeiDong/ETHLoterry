pragma solidity ^0.4.4;

contract LoterryBase {

  	// CEO address Used to award and handle exceptions;
    address public _owner;
	address public _ceo_address;

	// The current status of the program
	bool public paused = false;

    //Number of periods
    uint32 public cur_period_num = 0;

    // cur period status: 
    // 0 init value.
    // 1 open purchase. 
    // 2 the current period is over,waiting to send reward. 
    // 3 prize pool have been calculated;
    // 4 in this period,have sended reward,waiting to start new period. 
    uint32 public cur_period_status = 0;

    function LoterryBase(){
    	_owner = msg.sender;
        _ceo_address = msg.sender;
    }
    //only ceo can operate
    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    //the program is operating normally
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    //can be purchased
    modifier isCanPurchase(){
        require(cur_period_status==1 && !paused);
        _;
    }
    function isCanBuy() public returns(bool){
        return (cur_period_status==1 && !paused);
    }
    //pause programe
    function pauseProgram() public onlyOwner{
        paused = true;
    }
    //set ceo address
    function setCEOAddress(address ad) public onlyOwner{
        _ceo_address = ad;
    }
    function destory() public onlyOwner{
        suicide(_owner);
    }
    //resume program
    function resumeProgram() public onlyOwner{
        paused = false;
    }

	struct PurchasedLottery {
        uint32 lottery_code;
        address user_address;
        uint8 multiple;
        uint8 status; //0 normall , 1 waiting refund , 2 refunded , 3 unpaid
    }
    //The lottery that has been sold in this period.
    PurchasedLottery[] cur_period_purchased_lotteries;
    uint32 public cur_period_purchased_lotteries_length = 0;
    function getPurchasedNum() public view returns(uint32)
    {
        return uint32(cur_period_purchased_lotteries_length);
    }
    struct FinishedLottery {
        uint32 lottery_code;
        address user_address;
        uint256 win_price;
        uint8 multiple;
        uint8 level;
        //is the award has been given
        bool status;
    }
    //The winning lottery ticket last issue
    FinishedLottery[] public all_period_finished_lotteries;
    uint32 public all_period_finished_lotteries_length = 0;
    //mapping (uint32 => FinishedLottery[]) public all_period_finished_lotteries;
    //the winning numbers on every period.
    uint32 public pre_winning_number;
    mapping (uint32 => uint32) pre_winning_numbers;
    function getWinNumber(uint32 period) public view returns(uint32)
    {
        return pre_winning_numbers[period];
    }
    function getLoterryPrice() public view returns(uint256){
    	return 10000000000000000;//0.01 eth
    }

    //last period reward nums
    uint32 public all_lottery_num;
    uint32 public first_reward_lottery_num;
    uint32 public second_reward_lottery_num;
    uint32 public third_reward_lottery_num;
    uint256 public first_reward_eth_num;
    uint256 public second_reward_eth_num;
    uint256 public third_reward_eth_num;

    event refresh();
}
