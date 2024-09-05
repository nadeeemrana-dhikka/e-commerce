const arr = [
    {
        "id": 8,
        "userId": 4,
        "productId": 10,
        "quantity": 12,
        "price": 16,
        "totalPrice": "191.88",
        "createdAt": "2024-09-03T13:17:48.669Z",
        "updatedAt": "2024-09-03T13:18:16.000Z",
        "deletedAt": null
    },
    {
        "id": 9,
        "userId": 4,
        "productId": 11,
        "quantity": 10,
        "price": 16,
        "totalPrice": "159.90",
        "createdAt": "2024-09-03T13:20:17.438Z",
        "updatedAt": "2024-09-03T13:20:17.438Z",
        "deletedAt": null
    }
]

const sumOfPrices = arr.forEach((item) => {
    const items ={
        id: item.id,
        userId: item.userId,
        productId: item.productId,
       quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice
    }
  console.log(items);
});

// console.log(sumOfPrices);