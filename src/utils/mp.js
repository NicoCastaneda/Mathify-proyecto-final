export const handleIntegrationMP = async (quantity, unit_price) => {
    const preferencia = {
        "items": [
          {
            "id": `CL${quantity}`,
            "title": `${quantity} Clues`,
            "description": `${quantity} clues to spend on greater questions! like, 'What is cheese really about?' `,
            "picture_url": "http://www.myapp.com/myimage.jpg",
            "category_id": "clues",
            "quantity": quantity,
            "currency_id": "USD",
            "unit_price": Number(`${unit_price/quantity}`)
          }
        ]
      }

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences',{
            method: "POST",
            headers: {
                'Authorization': "Bearer TEST-5344925175069954-052622-70ecaededef47b0c9cb4ba6bbf9d905d-457680408",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferencia)
        })
        const data = await response.json()
        var values = []
        values.push(data.init_point)
        values.push(data.id)
        console.log(data)
        return values
    } catch (error) {
        console.log(error)
    }
}