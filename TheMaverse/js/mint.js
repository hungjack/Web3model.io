$(function() {
  $("#mint").click(function() {
      var name = $.trim($("[name=name]").val());
      const nameElement = document.getElementById("amount");
      const amount = nameElement.value;
      const price = web3.utils.toWei('0.001', 'ether')*amount;
      var url = 'https://wtowi29z8d.execute-api.us-east-1.amazonaws.com/test/' + name;
      $.get(url, function(data) {
          $("pre").text(JSON.stringify(data, null, 2));
          var proof = JSON.parse(JSON.stringify(data, null, 2));
      if(proof.length == 0){
          return swal ( "warning" ,  "Sorry, you are not in whitelist!" ,  "warning" );
      }else{
          //document.getElementById('message').textContent='交易處理中,請稍後';
          console.log(proof);
          console.log(price);
        try{
          Contract.methods.presaleMint(amount,proof).send({from:accounts[0], value:price})
          .then(function(data){
              console.log(data);
              swal ( "Success" ,  "successful transaction!" ,  "success" );
              //document.getElementById('message').textContent='交易處理結束';
          })
        }catch(e){
            swal ( "Error" ,  "transaction failed!" ,  "error" );
            //document.getElementById('message').textContent='交易失敗';
        }
      }
     
    });
      
  });

});