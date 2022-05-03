import json
 
# Opening JSON file
with open('D:\\batangmininft\\minter-dapp-1\\backend\\build\\json\\_metadata.json') as json_file:
    data = json.load(json_file)
    
    new_data = []
    mini_type1 = "MINI Impostor"
    mini_type2 = "MINI Makabayan"
    mini_type3 = "MINI Binibini"
    mini_type = "MINI BATANG ASTIG"
    
    for x in data:
        for i in x['attributes']:
            trait_type = i["trait_type"]
            value = i["value"]
            name = x["name"]
            if "Hoodie" in value:
                new_data.append(name)
                print(name)
            
            # if trait_type == "Hair" and value == "Nanay Hair":
                # new_data.append(x)
                
    # y_data = []
    # for y in new_data:
        # for _i in y['attributes']:
            # _value = _i["value"]
            # _name = y["name"]
            # if "Filipinia" in _value:
                # print(_name)
                # y_data.append(y)
                
                
                
    total = len(new_data)
    print("")
    print(total, "NFT", "is", mini_type )
    
