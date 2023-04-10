export const response = (messages: string | string[]) => {

  const text = Array.isArray(messages)? messages[Math.trunc(Math.random()*messages.length)]: messages
    
  return {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [ text ]
        }
      }
    ]
  }
}