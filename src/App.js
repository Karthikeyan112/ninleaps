import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
    }

    createNewProduct = (item) => {
      return this.state.products.reduce((acc, product) => {
        if (product.id === item.id) {
          return [...acc, item]
        }
        return [...acc, product];
      }, []);
    }

    updateCart = (item) => {
      return this.state.cart.items.reduce((acc, cartItem) => {
        if(cartItem.id === item.id) {
          return [...acc, { id: item.id, item: item.name, quantity: item.cartQuantity }]
        }
        return [...acc, cartItem]
      }, []);
    }
    increment = (item) => {
      const newItem = { ...item, cartQuantity: item.cartQuantity + 1}
      const newProducts = this.createNewProduct(newItem);
      const newCartItems = this.updateCart(newItem);
      this.setState({
        products: newProducts,
        cart: {
          ...this.state.cart, items: newCartItems
        }
      });
    }

    decrement = (item) => {
      const newItem = { ...item, cartQuantity: item.cartQuantity - 1 }
      const newProducts = this.createNewProduct(newItem);
      const newCartItems = this.updateCart(newItem);
      if (newItem.cartQuantity === 0) {
        this.setState({
          products: newProducts,
          cart: {
            ...this.state.cart, items: [...this.state.cart.items.filter(product => product.id !== item.id)]
          }
        });
      } else {
        this.setState({
          products: newProducts,
          cart: {
            ...this.state.cart, items: newCartItems
          }
        });

      }
    }

    addToCart = (item) => {
      const newItem = { ...item, cartQuantity: item.cartQuantity + 1 }
      const newProducts = this.createNewProduct(newItem);

      this.setState({
        products: newProducts,
        cart: {
          ...this.state.cart, items: [...this.state.cart.items, { id: newItem.id, item: newItem.name, quantity: newItem.cartQuantity }]
        }
      });
    }
    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      increment={this.increment}
                      decrement={this.decrement}
                    />
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
