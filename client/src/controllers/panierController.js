'use strict';

   app.controller('panierController', function ($scope, $http, $modal) {
        $scope.cart = [];


        $scope.addToCart = function (product) {
            var found = false;
            console.log('panier');
            $scope.cart.forEach(function (item) {
                if (item.id === product.id) {
                    item.quantity++;
                    found = true;
                }
            });
            if (!found) {
                $scope.cart.push(angular.extend({quantity: 1}, product));
            }
        };

        $scope.getCartPrice = function () {
            var total = 0;
            $scope.cart.forEach(function (product) {
                total += product.price * product.quantity;
            });
            return total;
        };
       
    })

    .controller('CheckoutCtrl', function ($scope, totalAmount) {
        $scope.totalAmount = totalAmount;

        $scope.onSubmit = function () {
            $scope.processing = true;
        };

        $scope.stripeCallback = function (code, result) {
            $scope.processing = false;
            $scope.hideAlerts();
            if (result.error) {
                $scope.stripeError = result.error.message;
            } else {
                $scope.stripeToken = result.id;
            }
        };

        $scope.hideAlerts = function () {
            $scope.stripeError = null;
            $scope.stripeToken = null;
        };
    });
