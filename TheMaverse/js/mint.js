$(function() {
  $("#mint").click(function() {
      var name = $.trim($("[name=name]").val());
      const nameElement = document.getElementById("amount");
      const amount = nameElement.value;
      //const price = web3.utils.toWei('0.001', 'ether')*amount;
      var url = 'https://wtowi29z8d.execute-api.us-east-1.amazonaws.com/test/' + name;
      $.get(url, function(data) {
          $("pre").text(JSON.stringify(data, null, 2));
          var proof = JSON.parse(JSON.stringify(data, null, 2));
      if(proof.length == 0){
          return swal ( "warning" ,  "Sorry, you are not in whitelist!" ,  "warning" );
      }else{
          const price = web3.utils.toWei('0.065', 'ether')*amount;
          //document.getElementById('message').textContent='交易處理中,請稍後';
          console.log(proof);
          console.log(price);
          if(chainId == 1){//連接主網:1 測試網:4
            try{
              Contract.methods.presaleMint(amount,proof).send({from:accounts[0], value:price,gas: '200000'})
              .then(function(data){
                  console.log(data);
                  swal ( "Success" ,  "successful transaction!" ,  "success" );
                  //document.getElementById('message').textContent='交易處理結束';
              })
              .catch((error) => {
                if (error.code === 4001) {
                  // EIP-1193 userRejectedRequest error
                  // The request was rejected by the user
                  swal ( "Error" ,  "User denied transaction signature!" ,  "error" );
                  console.log('User denied transaction signature.');
                } else {
                  swal ( "Error" ,  "Max mint amount per wallet exceeded!" ,  "error" );
                  console.error(error);
                }
              });
            }catch(e){
                swal ( "Error" ,  "transaction failed!" ,  "error" );
                //document.getElementById('message').textContent='交易失敗';
            }
					}else{//非主網
            swal ( "Error" ,  "Please connect to main!" ,  "error" );
						//showchainId.innerHTML = "Please connect to mainnet";
					}
      }
     
    }).fail(function() {
      swal ( "Error" ,  "Please connect to wallet!" ,  "error" ); // Error logic
    });
      
  });

});



$(function() {
  // This button will increment the value
  $('.qtyplus').click(function(e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $('input[name=' + fieldName + ']').val(currentVal + 1);
      if(currentVal >= 10){
        $('input[name=' + fieldName + ']').val(10);
      }
    } else {
      // Otherwise put a 0 there
      $('input[name=' + fieldName + ']').val(0);
    }
    setTotal();
  })
  // This button will decrement the value till 0
  $(".qtyminus").click(function(e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 0) {
      // Decrement one
      $('input[name=' + fieldName + ']').val(currentVal - 1);
      if(currentVal <= 1){
        $('input[name=' + fieldName + ']').val(1);
      }
    } else {
      // Otherwise put a 0 there
      $('input[name=' + fieldName + ']').val(0);
    }
    setTotal();
  })
  //計算操作
  function setTotal(){
  $("#showPrice").html("Total Price:"+(parseInt($('input[name=' + fieldName + ']').val())*0.065).toFixed(3)+"ETH");//toFixed()是保留小數點的函式很實用哦
  }
  //初始化
  setTotal();
});

