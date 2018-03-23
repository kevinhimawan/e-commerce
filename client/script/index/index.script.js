// axios.
new Vue({
    el: '#index',
    data:{
      signin: false,
      signout: false,
      myacount: false,
      searching: '',
      allproduct: [],
      specificShoe: {},
      modalSell:{
        size: 'Size',
        duration: 'Duration',
        inputvalue: '',
        sizeid: '',
        notes: ''
      },
      modalBid:{
        size: 'Size',
        duration: 'Duration',
        inputvalue: '',
        sizeid: '',
        notes: ''
      }
    },
    created: function () {
        const token = localStorage.getItem('token')
        if(token){this.myacount = true
          this.signout = true
        }else{
          this.signout = false
          this.myacount = false
          this.signin = true
        }
        axios.get('http://server-commerce.kevinhimawan.xyz/home/getallproducts')
        .then(response => {
          this.allproduct = this.getTheLowestAndHighes(response.data)
        })
    },
    methods:{
      signOut:function(){
          localStorage.clear()
          window.location.href = 'login.html'
      },

      getTheLowestAndHighes:function(value){
        for(let i = 0 ; i < value.length; i++){
        let lowestAsk; 
        let highestBid;
          for(let j = 0; j < value[i].shoeSellProduct.length; j++){
            if(j === 0){
              lowestAsk = value[i].shoeSellProduct[j].price
            }
            if(value[i].shoeSellProduct[j].price < lowestAsk){
              lowestAsk = value[i].shoeSellProduct[j].price
            }
          }
          for(let j = 0; j < value[i].shoeBidding.length; j++){
            if(j === 0){
              highestBid = value[i].shoeBidding[j].bidding
            }
            if(value[i].shoeBidding[j].bidding > highestBid){
              highestBid = value[i].shoeBidding[j].bidding
            }
          }
          if(highestBid === undefined){
            highestBid = 0
          }
            value[i]['highestBid'] = highestBid
            value[i]['lowestAsk'] = lowestAsk
        }
        
        return value
      },
      shoespecific: function (value) {
        axios.get('http://server-commerce.kevinhimawan.xyz/home/getspecificproduct',{
          headers: value
        })
        .then(response => {
          this.specificShoe = response.data
          let lowestAsk;
          for(let i = 0; i < this.specificShoe.shoeSellProduct.length;i++){
            if(i === 0){
              lowestAsk = this.specificShoe.shoeSellProduct[i].price
            }
            if(this.specificShoe.shoeSellProduct[i].price < lowestAsk){
              lowestAsk = this.specificShoe.shoeSellProduct[i].price
            }
          }
          let highestBid;
          for(let j = 0; j < this.specificShoe.shoeBidding.length; j++){
            if(j === 0){
              highestBid = this.specificShoe.shoeBidding[j].bidding
            }
            if(this.specificShoe.shoeBidding[j].bidding > highestBid){
              highestBid = this.specificShoe.shoeBidding[j].bidding
            }
          }
          if(highestBid === undefined){
            highestBid = 0
          }
          if(lowestAsk === undefined){
            lowestAsk = 0
          }

          this.specificShoe['highestBid'] = highestBid
          this.specificShoe['lowestAsk'] = lowestAsk
          
          for(let i = 0 ; i < this.specificShoe.size.length; i++){
            let lowestAsk;
            let countAsk = 0
            let countBid = 0
            for(let j = 0; j < this.specificShoe.shoeSellProduct.length; j++){
              if(this.specificShoe.size[i]._id === this.specificShoe.shoeSellProduct[j].size) {
                if(countAsk === 0){
                    lowestAsk = this.specificShoe.shoeSellProduct[j].price
                    countAsk++
                }else{
                    if(lowestAsk > this.specificShoe.shoeSellProduct[j].price){
                      lowestAsk = this.specificShoe.shoeSellProduct[j].price
                    }
                }
              }
            }
            let highestBid;
            for(let j = 0; j < this.specificShoe.shoeBidding.length; j++){
              
              if(this.specificShoe.size[i]._id === this.specificShoe.shoeBidding[j].size) {
                if(countBid === 0){
                    highestBid = this.specificShoe.shoeBidding[j].bidding
                    countAsk++
                }else{
                    if(highestBid > this.specificShoe.shoeBidding[j].bidding){
                      highestBid = this.specificShoe.shoeBidding[j].bidding
                      
                    }
                }
              }
            }
            if(highestBid === undefined){
              highestBid = 0
            }
            this.specificShoe.size[i]['highestBid'] = highestBid
            this.specificShoe.size[i]['lowestAsk'] = lowestAsk
            countAsk = 0
            countBid = 0
          }
          
        })

      },
      changemodal:function(value){
        this.modalSell.size = value.size
        this.modalSell.sizeid = value.sizeid
        this.specificShoe.lowestAsk = this.specificShoe.size[value.index].lowestAsk
        this.specificShoe.highestBid = this.specificShoe.size[value.index].highestBid
    },

    changeduration:function(value){
        if(value.duration > 1){
            this.modalSell.duration = value.duration + ' Days'
        }else{
            this.modalSell.duration = value.duration + ' Day'
        }
    },
    changemodalbid:function(value){
      this.modalBid.size = value.size
      this.modalBid.sizeid = value.sizeid
      this.specificShoe.lowestAsk = this.specificShoe.size[value.index].lowestAsk
      this.specificShoe.highestBid = this.specificShoe.size[value.index].highestBid
    },  

    changedurationbid:function(value){
        if(value.duration > 1){
            this.modalBid.duration = value.duration + ' Days'
        }else{
            this.modalBid.duration = value.duration + ' Day'
        }
    },
    searchFunction: function () {
      console.log('hello')
      axios.get('http://server-commerce.kevinhimawan.xyz/admin/searchproduct',{
        headers:{
            searchkey: this.searching
        }
      })
      .then(response=>{
        console.log(response.data)
          this.allproduct = response.data
      })
    }
  }
})
