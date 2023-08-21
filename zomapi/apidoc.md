//Page1

> (GET) List of all Cities
* http://localhost:8771/location

> (GET) List of all Restaurants
* http://localhost:8771/restaurants

> (GET) Restaurants wrt city
* http://localhost:8771/restaurants?stateId=2
* http://localhost:8771/restaurants?stateId=3&mealId=4

> (GET) List of meals
* http://localhost:8771/mealType


//Page2
> (GET) Restaurants wrt meal
* http://localhost:8771/restaurants?mealId=2

> (GET) Restaurants wrt meal + cuisine
* http://localhost:8771/filters/1?cuisineId=1

> (GET) Restaurants wrt meal + cost
* http://localhost:8771/filters/1?lcost=500&hcost=900

> (GET) Sort on basis of price
* http://localhost:8771/filters/1?lcost=300&hcost=900&sort=-1

> (GET) Pagination
* http://localhost:8771/filters/1?skip=6&limit=2


//Page3
> (GET) Details of Restaurants
* http://localhost:8771/details/6288d22dbb17b75750d11cad
> (GET) Restaurants wrt menu
* http://localhost:8771/menu/11

//Page4
> (POST) Details of selected menu
> (POST) Place Order

//Page5
> (GET) Get all orders / orders wrt to email
* http://localhost:8771/orders
* http://localhost:8771/orders?email=a@a.com

> (PUT) Update order status
> (DELETE) Delete orders