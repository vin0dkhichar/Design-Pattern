import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./index.css";

/* ================= CART SLICE ================= */
const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], totalAmount: 0 },
    reducers: {
        addToCart(state, action) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.qty += 1;
                state.totalAmount += item.price;
            } else {
                state.items.push({ ...action.payload, qty: 1 });
                state.totalAmount += action.payload.price;
            }
        },
        removeFromCart(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (!item) return;
            if (item.qty === 1) {
                state.items = state.items.filter(i => i.id !== action.payload);
            } else {
                item.qty -= 1;
            }
            state.totalAmount -= item.price;
        },
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
        }
    }
});

const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
const store = configureStore({ reducer: { cart: cartSlice.reducer } });

/* ================= DATA ================= */
const products = [
    { id: 1, name: "MacBook Pro", price: 199000, emoji: "💻", category: "Computers", badge: "Bestseller" },
    { id: 2, name: "iPhone 15 Pro", price: 134900, emoji: "📱", category: "Phones", badge: "New" },
    { id: 3, name: "Sony WH-1000XM5", price: 29990, emoji: "🎧", category: "Audio", badge: null },
    { id: 4, name: "iPad Air", price: 59900, emoji: "📟", category: "Tablets", badge: null },
    { id: 5, name: "Apple Watch S9", price: 41900, emoji: "⌚", category: "Wearables", badge: "New" },
    { id: 6, name: "Samsung 4K TV", price: 89999, emoji: "📺", category: "TVs", badge: null },
    { id: 7, name: "Canon EOS R50", price: 74995, emoji: "📷", category: "Cameras", badge: null },
    { id: 8, name: "PlayStation 5", price: 54990, emoji: "🎮", category: "Gaming", badge: "Hot" },
    { id: 9, name: "Kindle Paperwhite", price: 13999, emoji: "📖", category: "E-Readers", badge: null },
    { id: 10, name: "AirPods Pro", price: 24900, emoji: "🎵", category: "Audio", badge: "Bestseller" },
    { id: 11, name: "Dell 27\" Monitor", price: 32500, emoji: "🖥️", category: "Computers", badge: null },
    { id: 12, name: "Logitech MX Keys", price: 9995, emoji: "⌨️", category: "Accessories", badge: null },
];

const categories = ["All", ...new Set(products.map(p => p.category))];
const fmt = (n) => "₹" + n.toLocaleString("en-IN");

const badgeStyle = (badge) => {
    if (badge === "Hot") return "bg-red-500 text-white";
    if (badge === "New") return "bg-sky-400 text-gray-900";
    return "bg-lime-400 text-gray-900";
};

/* ================= COMPONENTS ================= */

function ProductCard({ product }) {
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cart.items.find(i => i.id === product.id));
    const qty = cartItem?.qty ?? 0;

    return (
        <div className="relative flex flex-col gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-violet-500 transition-all hover:-translate-y-1">
            {product.badge && (
                <span className={`absolute top-3 right-3 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeStyle(product.badge)}`}>
                    {product.badge}
                </span>
            )}
            <span className="text-4xl">{product.emoji}</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</span>
            <p className="font-semibold text-white text-sm leading-snug">{product.name}</p>
            <p className="text-lime-400 font-bold text-lg">{fmt(product.price)}</p>

            {qty === 0 ? (
                <button
                    onClick={() => dispatch(addToCart(product))}
                    className="mt-auto w-full py-2 rounded-xl bg-lime-400 text-gray-900 font-bold text-sm hover:bg-lime-300 active:scale-95 transition-all"
                >
                    + Add to Cart
                </button>
            ) : (
                <div className="mt-auto flex items-center justify-between bg-gray-800 rounded-xl px-3 py-1.5">
                    <button
                        onClick={() => dispatch(removeFromCart(product.id))}
                        className="w-7 h-7 rounded-lg bg-gray-700 hover:bg-violet-600 text-white font-bold transition-colors flex items-center justify-center"
                    >
                        −
                    </button>
                    <span className="font-bold text-white">{qty}</span>
                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="w-7 h-7 rounded-lg bg-gray-700 hover:bg-violet-600 text-white font-bold transition-colors flex items-center justify-center"
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

function ProductsPanel() {
    const [search, setSearch] = useState("");
    const [activeCat, setActiveCat] = useState("All");

    const filtered = products.filter(p => {
        const matchCat = activeCat === "All" || p.category === activeCat;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="flex flex-col gap-5">
            <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm outline-none focus:border-violet-500 transition-colors"
            />

            <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                    <button
                        key={c}
                        onClick={() => setActiveCat(c)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${activeCat === c
                                ? "bg-lime-400 border-lime-400 text-gray-900"
                                : "bg-transparent border-gray-700 text-gray-400 hover:border-violet-500 hover:text-white"
                            }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="py-20 text-center text-gray-600 text-sm">
                    No products found for "{search}"
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
}

function CartPanel() {
    const { items, totalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const totalItems = items.reduce((s, i) => s + i.qty, 0);
    const savings = Math.round(totalAmount * 0.05);
    const finalTotal = Math.max(0, totalAmount - savings);

    return (
        <aside className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden sticky top-6 max-h-screen">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">Your Cart</span>
                    {totalItems > 0 && (
                        <span className="bg-lime-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                            {totalItems}
                        </span>
                    )}
                </div>
                {items.length > 0 && (
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="text-xs text-gray-500 border border-gray-700 px-3 py-1 rounded-lg hover:border-red-500 hover:text-red-400 transition-all"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {items.length === 0 ? (
                    <div className="py-16 text-center text-gray-600 text-sm">
                        <div className="text-5xl mb-3 opacity-30">🛒</div>
                        Your cart is empty.
                        <br />Add something awesome!
                    </div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 bg-gray-800 rounded-xl px-3 py-2.5 border border-gray-700">
                            <span className="text-2xl shrink-0">{item.emoji}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-xs font-semibold truncate">{item.name}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{fmt(item.price * item.qty)}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="w-6 h-6 rounded-md bg-gray-700 hover:bg-red-500 text-white text-sm font-bold transition-colors flex items-center justify-center"
                                >
                                    −
                                </button>
                                <span className="text-white font-bold text-sm w-4 text-center">{item.qty}</span>
                                <button
                                    onClick={() => dispatch(addToCart(item))}
                                    className="w-6 h-6 rounded-md bg-gray-700 hover:bg-violet-600 text-white text-sm font-bold transition-colors flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="px-5 py-4 border-t border-gray-800 flex flex-col gap-3">
                <div className="flex flex-col gap-1.5 text-sm">
                    <div className="flex justify-between text-gray-500">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>{fmt(totalAmount)}</span>
                    </div>
                    {totalAmount > 0 && (
                        <div className="flex justify-between text-lime-400">
                            <span>Discount (5%)</span>
                            <span>−{fmt(savings)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-gray-800 mt-1">
                        <span>Total</span>
                        <span className="text-lime-400">{fmt(finalTotal)}</span>
                    </div>
                </div>
                <button
                    disabled={items.length === 0}
                    className="w-full py-3 rounded-xl bg-lime-400 text-gray-900 font-bold text-sm hover:bg-lime-300 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    Proceed to Checkout →
                </button>
            </div>
        </aside>
    );
}

/* ================= APP ================= */
export default function App() {
    return (
        <Provider store={store}>
            <div className="min-h-screen bg-gray-950 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="flex items-center justify-between py-6 border-b border-gray-800 mb-8">
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            shop<span className="text-lime-400">.</span>arc
                        </h1>
                        <span className="text-xs font-semibold uppercase tracking-widest bg-lime-400 text-gray-900 px-3 py-1 rounded-full">
                            Free delivery over ₹5,000
                        </span>
                    </header>

                    <div className="flex gap-8 pb-12 items-start">
                        <div className="flex-1 min-w-0">
                            <ProductsPanel />
                        </div>
                        <div className="w-80 shrink-0">
                            <CartPanel />
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    );
}