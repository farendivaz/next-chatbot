export default function Compare(promptsArray, repliesArray, string) {
  let reply;
  let botReplyFound = false;
  let randomReply;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        // give reply from the same line
        randomReply = repliesArray[x];
        // give random reply from 1 array that pointed to user
        reply = randomReply[Math.floor(Math.random() * randomReply.length)];
        botReplyFound = true;
        // stop inner loop when input value matches prompts
        break;
      }
    }
    // stop outer loop when reply is found instead of interating through the entire array
    if (botReplyFound) {
      break;
    }
  }
  return reply;
}