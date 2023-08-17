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
> (GET) Pagination


//Page3
> (GET) Details of Restaurants
> (GET) Restaurants wrt menu

//Page4
> (POST) Details of selected menu
> (POST) Place Order

//Page5
> (GET) Get all orders / orders wrt to email
> (PUT) Update order status
> (DELETE) Delete orders