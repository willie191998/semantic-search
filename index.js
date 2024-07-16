//the code style follows a function call

let responseItems = [];
    let inputEmbedding = [];
    let articleData = [];
    const data = { 
      "inputs": inputText,
      "options":{"wait_for_model": true}
    }
    try {
      if (type == 'title') {
        const randomScan = {
          TableName: <Your Table Name>, // Replace with your actual table name
          Limit: 30,
          ProjectionExpression: "title, link"
        };
        responseItems = (await dynamodbDocClient.send(new ScanCommand(scan))).Items;
        const responseEmbbeding = [];
        for (let n=0; n<responseItems.length; n++) {
          const embedScan = {
            TableName: <your Table Name>, // Replace with your actual table name
            KeyConditionExpression: '#link = :linkVal',
            ExpressionAttributeValues: {
              ':linkVal': responseItems[n].link // Value of the primary key
            },
            ProjectionExpression: "embedding, link"
          };
          responseEmbbeding.push((await dynamodbDocClient.get(embedScan).promise).Items);
        }
      }
      else if (type == 'result') {
        const randomScan = {
          TableName: <Your Table Name>, // Replace with your actual table name
          Limit: 50,
          ProjectionExpression: "title, link, imageAlt, imageLink, summary, dateCreated, likes, authorName"
        };
        responseItems = (await dynamodbDocClient.send(new ScanCommand(scan))).Items;
        const responseEmbbeding = [];
        for (let n=0; n<responseItems.length; n++) {
          const embedScan = {
            TableName: embeddingTable, // Replace with your actual table name
            KeyConditionExpression: '#link = :linkVal',
            ExpressionAttributeValues: {
              ':linkVal': responseItems[n].link // Value of the primary key
            },
            ProjectionExpression: "embedding, link"
          };
          responseEmbbeding.push((await dynamodbDocClient.get(embedScan).promise).Items);
        }
      }
      const response = await fetch(
        "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
        {
          headers: { Authorization: `Bearer <your token>` },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      inputEmbedding = await response.json();
      //console.log(JSON.stringify(inputEmbedding));
      // [0.6945773363113403,0.9429150819778442,0.2568760812282562]
      for (let counter = 0; counter < responseItems.length; counter++) {
        var score = similarity(inputEmbedding, responseEmbbeding[counter].embedding);
        if (score < 0.5) {
          responseItems.splice(counter, 1);
          responseEmbbeding.splice(counter, 1);
          counter--;
        }
        else {
          responseItems[counter].similarity = score;
        }
      }
      responseItems.sort(function(a, b){
        return b.similarity - a.similarity ;
      });
      responseItems.splice(length);
      articleData.push({"data": responseItems});
      articleData.push({"result": "successful"});
    }
    catch (err) {
      articleData.push({"result": "unsuccessful", "error": err});
    }
    return articleData;
