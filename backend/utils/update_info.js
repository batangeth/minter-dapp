const basePath = process.cwd();
const fs = require("fs");
const yesno = require('yesno');

const {
  baseUri,
  description,
  namePrefix,
} = require(`${basePath}/src/config.js`);

(async () => {
  // read json data
  let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
  let data = JSON.parse(rawdata);

  console.log("Info will be updated using the config.js data.");
  const updateName = await yesno(`Update names?`);
  const updateDescription = await yesno(`Update descriptions?`);
  const updateBaseUri = await yesno(`Update images base URI?`);

  data.forEach((item) => {
    padded = ('000'+item).slice(-4);
    if(updateName) padded.name = `${namePrefix} #${padded.edition}`;
    if(updateDescription) padded.description = description;
    if(updateBaseUri) padded.image = `${baseUri}/${padded.edition}.png`;
  
    fs.writeFileSync(
      `${basePath}/build/json/${padded.edition}.json`,
      JSON.stringify(padded, null, 2)
    );
  });

  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

  if(updateName) console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  if(updateBaseUri) console.log(`Updated baseUri for images to ===> ${baseUri}`);
  if(updateDescription) console.log(`Updated description for images to ===> ${description}`);
})()
