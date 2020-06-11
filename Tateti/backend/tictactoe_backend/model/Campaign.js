let campaign = {
    hash: null,
    p1_name: null,
    p1_name: null,
    p1_symbol: null,
    p2_symbol: null,
    p1_score: null,
    p2_score: null,
    ties: null,
    next_player: null,
    last_board: null
}

let set_campaign= function(obj){
    campaign.hash = obj.hash
    campaign.p1_name = obj.p1_name
    campaign.p2_name = obj.p2_name
    campaign.p1_symbol = obj.p1_symbol
    campaign.p2_symbol = obj.p2_symbol
    campaign.id_campaign = obj.id_campaign
    campaign.p1_score = obj.p1_score
    campaign.p2_score = obj.p2_score
    campaign.next_player = obj.next_player
}

let get_campaign = function(obj){
    return campaign
}