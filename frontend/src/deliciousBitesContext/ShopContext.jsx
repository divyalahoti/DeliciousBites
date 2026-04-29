import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    // const [token, setToken] = useState('')
    // const [user, setUser] = useState('')

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [user, setUser] = useState(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
    );
    const navigate = useNavigate();

    const addToCart = async (itemId) => {
        if (!user || !user._id) {
            toast.error("Please login first");
            return;
        }

        let cartData = { ...cartItems };

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    {
                        userId: user._id,   // ✅ FIXED
                        itemId: itemId
                    },
                    {
                        headers: { token }
                    }
                );

            } catch (error) {
                console.log(error);
                toast.error("Cart Error");
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;

        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, quantity) => {
        let cartData = { ...cartItems };
        cartData[itemId] = quantity;

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    {
                        userId: user._id,
                        itemId,
                        quantity
                    },
                    {
                        headers: { token }
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getCartAmount = () => {
        let total = 0;

        for (const itemId in cartItems) {
            const item = products.find(p => p._id === itemId);

            if (item) {
                total += item.price * cartItems[itemId];
            }
        }

        return total;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const removeFromCart = async (itemId) => {
        let cartData = { ...cartItems };
        delete cartData[itemId];
        setCartItems(cartData);
        await axios.post(
            backendUrl + "/api/cart/update",
            {
                userId: user._id,
                itemId,
                quantity: 0,
            },
            { headers: { token } }
        );
    };
    const clearCart = async () => {
        try {
            setCartItems({});
            await axios.post(
                backendUrl + "/api/cart/clear",
                { userId: user._id },
                { headers: { token } }
            );
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProductsData()
    }, [])

    // useEffect(() => {
    //     if (!token && localStorage.getItem('token')) {
    //         setToken(localStorage.getItem('token'))
    //         getUserCart(localStorage.getItem('token'))
    //     }
    //     else {
    //         localStorage.removeItem("token");
    //     }
    // }, [token])

    // useEffect(() => {
    //     if (!user && localStorage.getItem('user')) {
    //         setUser(localStorage.getItem('user'))
    //     } else {
    //         localStorage.removeItem("user");
    //     }
    // }, [user]);
    // console.log(token);
    // console.log(user)

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products,
        currency,
        cartItems,
        updateQuantity,
        addToCart,
        navigate,
        getCartCount,
        getCartAmount,
        backendUrl,
        delivery_fee,
        clearCart,
        removeFromCart,
        setToken, token,
        setUser, user,
        setCartItems
    }
    return (
        <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
    )
}
export default ShopContextProvider;
