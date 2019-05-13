const axios = require('axios')
const {GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString,
    GraphQLList,
GraphQLSchema} = require('graphql')

// Currency Type
const CurrencyType = new GraphQLObjectType({
    name: 'Currency',
    fields:() => ({
        id: {type: GraphQLString},
        type:{type: GraphQLString},
        symbol:{type: GraphQLString},

    })
})

// Currency Market 
// There is an option to manually choose a market by including it at
// the end of the URL
// /tickets/btccad 
const CurrencyTickerType = new GraphQLObjectType({
    name: 'CurrencyTicker',
    fields:() => ({
        market: {type: GraphQLString},
        bid:{type: GraphQLString},
        ask:{type: GraphQLString},
        low:{type: GraphQLString},
        high:{type: GraphQLString},
        last:{type: GraphQLString},
        open: {type: GraphQLString},
        vol:{type: GraphQLString}

    })
})

// Root Query 
const RootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        currencies:{
            type: new GraphQLList(CurrencyType),
            resolve(parent, args){
                return axios.get(`https://api.coinfield.com/v1/currencies`)
                .then(res => res.data.currencies)
            }
        }, 
        tickers:{
            type: new GraphQLList(CurrencyTickerType),
            resolve(parent, args){
                return axios.get('https://api.coinfield.com/v1/tickers')
                .then(res => res.data.markets)
            }
        },
        ticker:{ 
            type: CurrencyTickerType,
            args: {
                market: {type:GraphQLString}
            },
            resolve(parent, args){
                return axios.get(`https://api.coinfield.com/v1/tickers/${args.market}`)
                .then(res => res.data.markets[0])
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})

