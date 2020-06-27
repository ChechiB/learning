
# How to play

1. new campaign
2. join player number 2 
3. get status campaign
4. set position


----


# API documentation

### &#x2705; _[POST]_ new campaign
```
curl --location --request POST 'localhost:3000/campaign/new' \
--header 'Content-Type: application/json' \
--data-raw '{
    "namePlayer": namePlayer
}'
```

- url: `campaign/new`
- Create a new campaign and it returns the campaign hash
- body: `{ namePlayer: string }`
- Success: { 
    status: int,
    message: string,
    data: {
        campaignId: int
        hash: string
    }
 }

### &#x2705; _[GET]_ get campaign status
```
curl --location --request GET 'localhost:3000/campaign/236c0a957badee4b9fc3f2c0c8d86547/status' \
--header 'Content-Type: application/json' 
```

- url: `/campaign/:hash/status`
- Success1: 

```
{   
    status: int,
    message: string,
    data:{
        campaign: 
            {
                p1Score: int,
                p2Score: int,
                ties: int,
                lastGameId: int,
        },
        game:{
            players:{
                {
                    playerName: string,
                    idPlayer: int,
                    symbol: string
                },
                {
                    playerName: string,
                    idPlayer: int,
                    symbol: string
                },

            },
            status: boolean,
            nextPlayer: string,
            cell1: string,
            ...
            ...
            cell8: string
        }
        score:{
            scorePlayer1: number,
            scorePlayer2: number,
            ties: number,
        }
    }
}
```
- Error: 
```
{ 
    status: int,
    message: string,
    data: {
        hash: string
    }
}
```

### &#x2705; _POST_ Join to a campaign
```
curl --location --request POST 'localhost:3000/campaign/236c0a957badee4b9fc3f2c0c8d86547/join' \
--header 'Content-Type: application/json' \
--data-raw '{
    "namePlayer": "jugador1"
}'
```

- url: `/campaign/:hash/join`
- Join to an existing campaign
- body: `{ namePlayer: string }`
- Notes:
- Success: { idCampaign: int,hash: string }

### &#x2705; _[POST]_ place a symbol in a cell
```
curl --location --request POST 'localhost:3000/campaign/236c0a957badee4b9fc3f2c0c8d86547/cell/8' \
--header 'Content-Type: application/json' \
--data-raw '{
    "namePlayer": "jafi"
}'
```

- url: `/campaign/:hash/position/:cell`
- body: `{ idPlayer: int }`
- Success1: 
 ```
{ 
    status: int,
    message: "correctly placed",
    data: {
        hash: string
    }
 }
```
- Success2:
``` 
{ 
    status: int,
    message: "correctly placed, campaign won!",
    data: {
        hash: string
    }
}
```
- Success3:
```
{ 
    status: int,
    message: "occupied cell",
    data: {
        hash: string
    }
}
```
- Error: 
```
{ 
    status: int,
    message: string,
    data: {
        hash: string
    }
}
```