export const response = (text: string | string[]) => {

  const messages = Array.isArray(text)? text: [ text ]

  return {
    "fulfillmentMessages": messages.map(str => ({
      "text": {
        "text": [ str ]
      }
    }))
  }
}