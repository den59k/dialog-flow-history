export const response = (messages: string | string[]) => {
  return {
    "fulfillmentMessages": [
      {
        "text": {
          "text": Array.isArray(messages)? messages: [ messages ]
        }
      }
    ]
  }
}