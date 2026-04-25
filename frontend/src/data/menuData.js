// src/data/menuData.js

// IMPORT ALL IMAGES
import breakfast_1 from "../assets/breakfast_1.jpg";
import breakfast_2 from "../assets/breakfast_2.jpg";
import breakfast_3 from "../assets/breakfast_3.jpg";
import breakfast_4 from "../assets/breakfast_4.jpg";
import breakfast_5 from "../assets/breakfast_5.jpg";
import breakfast_6 from "../assets/breakfast_6.jpg";
import breakfast_7 from "../assets/breakfast_7.jpg";
import breakfast_8 from "../assets/breakfast_8.jpg";
import breakfast_9 from "../assets/breakfast_9.jpg";

import lunch_1 from "../assets/lunch_1.jpg";
import lunch_2 from "../assets/lunch_2.jpg";
import lunch_3 from "../assets/lunch_3.jpg";
import lunch_4 from "../assets/lunch_4.jpg";
import lunch_5 from "../assets/lunch_5.jpg";
import lunch_6 from "../assets/lunch_6.jpg";

import punjabi from "../assets/punjabi.jpg";
import gujarati from "../assets/gujarati.jpg";
import south from "../assets/south.jpg";
import chinese from "../assets/chinese.jpg";
import italian from "../assets/italian.jpg";
import dessert from "../assets/dessert.jpg";

// COMMON MENU DATA
export const menuData = [
    {
        category: "breakfast",
        title: "Breakfast Menu",
        items: [
            { _id: 1, name: "Upma", price: 100, image: breakfast_1 },
            { _id: 2, name: "Fafda Jalebi", price: 120, image: breakfast_2 },
            { _id: 3, name: "Methi Thepla", price: 90, image: breakfast_3 },
            { _id: 4, name: "Khaman Dhokla", price: 80, image: breakfast_4 },
            { _id: 5, name: "Poha", price: 70, image: breakfast_5 },
            { _id: 6, name: "Khandvi", price: 110, image: breakfast_6 },
            { _id: 7, name: "Sev Khamani", price: 95, image: breakfast_7 },
            { _id: 8, name: "Surati Locho", price: 100, image: breakfast_8 },
            { _id: 9, name: "Sandwich", price: 150, image: breakfast_9 },
        ],
    },

    {
        category: "lunch",
        title: "Lunch Menu",
        items: [
            {
                _id: 10,
                name: "Gujarati Thali",
                desc: "Traditional unlimited thali with authentic flavors",
                price: 180,
                image: lunch_1,
            },
            {
                _id: 11,
                name: "Kathiyawadi Special",
                desc: "Spicy rural-style Gujarati lunch platter",
                price: 150,
                image: lunch_2,
            },
            {
                _id: 12,
                name: "Mini Lunch Combo",
                desc: "1 sabzi, dal, roti & rice perfect combo",
                price: 120,
                image: lunch_3,
            },
            {
                _id: 13,
                name: "Daily Lunch",
                desc: "Simple & healthy everyday meal",
                price: 100,
                image: lunch_4,
            },
            {
                _id: 14,
                name: "Sunday Special Thali",
                desc: "Includes dessert & refreshing buttermilk",
                price: 200,
                image: lunch_5,
            },
            {
                _id: 15,
                name: "Dal Fry & Jeera Rice",
                desc: "Classic comfort food with rich flavors",
                price: 130,
                image: lunch_6,
            },
        ],
    },

    {
        category: "dinner",
        title: "Dinner Menu",
        // items: [
        //     { _id: 20, name: "Punjabi Dish", price: 220, image: dinner_1 },
        //     { _id: 21, name: "Gujarati Special", price: 160, image: dinner_2 },
        // ],

        items: [
            {
                dinner_id: 1,
                category: "Punjabi Specialties",
                icon: "🍛",
                image: punjabi,
                items: [
                    { _id: 16, name: "Paneer Tikka", price: 180 },
                    { _id: 17, name: "Amritsari Kulcha", price: 250 },
                    { _id: 18, name: "Samosa Chaat", price: 200 },
                    { _id: 19, name: "Palak Paneer", price: 60 },
                    { _id: 20, name: "Dal Makhani", price: 60 },
                    { _id: 21, name: "Kadai Veg", price: 60 },
                    { _id: 22, name: "Paneer Butter Masala", price: 60 },
                    { _id: 23, name: "Garlic Naan", price: 60 },
                    { _id: 24, name: "Lachha Paratha", price: 60 },
                    { _id: 25, name: "Tandoori Roti", price: 60 },
                ]
            },
            {
                dinner_id: 2,
                category: "Gujarati Specials",
                icon: "🥘",
                image: gujarati,
                items: [
                    { _id: 26, name: "Dhokla", price: 80 },
                    { _id: 27, name: "Khaman", price: 120 },
                    { _id: 28, name: "Patra", price: 90 },
                    { _id: 29, name: "Gujarati Dal", price: 60 },
                    { _id: 30, name: "Aloo Rasawala", price: 60 },
                    { _id: 31, name: "Methi Thepla", price: 60 },
                ]
            },
            {
                dinner_id: 3,
                category: "South Indian",
                icon: "🍽️",
                image: south,
                items: [
                    { _id: 32, name: "Masala Dosa", price: 120 },
                    { _id: 33, name: "Idli", price: 70 },
                    { _id: 34, name: "Sambar Rice", price: 100 },
                    { _id: 35, name: "Medu Vada", price: 60 },
                    { _id: 36, name: "Mysore Masala Dosa", price: 60 },
                    { _id: 37, name: "Coconut Rice", price: 60 },
                    { _id: 38, name: "Sambar Rice", price: 60 },
                    { _id: 39, name: "Uttapam", price: 60 },
                ]
            },
            {
                dinner_id: 4,
                category: "Indo-Chinese",
                icon: "🥡",
                image: chinese,
                items: [
                    { _id: 40, name: "Veg Manchurian", price: 150 },
                    { _id: 41, name: "Fried Rice", price: 140 },
                    { _id: 42, name: "Hakka Noodles", price: 130 },
                    { _id: 43, name: "Chilli Paneer", price: 130 },
                    { _id: 44, name: "Schezwan Rice", price: 130 },
                ]
            },
            {
                dinner_id: 5,
                category: "Italian",
                icon: "🍕",
                image: italian,
                items: [
                    { _id: 45, name: "Margherita Pizza", price: 220 },
                    { _id: 46, name: "Pasta", price: 200 },
                    { _id: 47, name: "Garlic Bread", price: 60 },
                    { _id: 48, name: "Bruschetta", price: 60 },
                    { _id: 49, name: "White Sauce Pasta", price: 60 },

                ]
            },
            {
                dinner_id: 6,
                category: "Desserts & Drinks",
                icon: "🍰",
                image: dessert,
                items: [
                    { _id: 50, name: "Gulab Jamun", price: 90 },
                    { _id: 51, name: "Rasmalai", price: 110 },
                    { _id: 52, name: "Mango Lassi", price: 80 },
                    { _id: 53, name: "Chocolate Brownie", price: 60 },
                    { _id: 54, name: "Masala Chai", price: 60 },
                    { _id: 55, name: "Fresh Lime Soda", price: 60 },
                    { _id: 56, name: "Cocacola", price: 60 },
                ]
            }
        ]
    },
];