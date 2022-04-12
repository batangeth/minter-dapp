import json
 
# Opening JSON file
with open('D:\\batangmininft\\minter-dapp-1\\backend\\build\\json\\_metadata.json') as json_file:
    data = json.load(json_file)
    traits = "Salakot"
    new_data = []
    for x in data:
        for i in x['attributes']:
            trait_type = i["trait_type"]
            value = i["value"]
            if value == traits:
                name = x['name']
                new_data.append(name)
                print(name)
                
    total = len(new_data)
    print("")
    print(total, "NFT", "has", traits, "traits." )
    
