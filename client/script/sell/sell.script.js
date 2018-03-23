new Vue({
    el: '#sell',
    data:{
        allShoes: [],
        searching: '',
        specificShoe: {},
        modalSell:{
            size: 'Size',
            duration: 'Duration',
            inputvalue: '',
            sizeid: '',
            notes: ''
        }
    },
    created:function(){
        const token = localStorage.getItem('token')
        
            axios.get('http://server-commerce.kevinhimawan.xyz/sell/shoeproduct')
            .then(response=>{
                // Get Lowest Ask 
                this.allShoes = this.getTheLowestAndHighes(response.data)
            })
        
    },
    methods:{
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

        searchFunction:function(){
            axios.get('http://server-commerce.kevinhimawan.xyz/sell/searchproduct',{
                headers:{
                    searchkey: this.searching
                }
            })
            .then(response=>{
                this.allShoes = this.getTheLowest(response.data)
            })
        },

        signOut:function(){
            localStorage.clear()
            window.location.href = 'login.html'
        },

        getSpecificProduct:function(value){
            axios.get('http://server-commerce.kevinhimawan.xyz/sell/getspecificproduct',{
                headers:value
            })
            .then(response=>{
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
        }
    }
})