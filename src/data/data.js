import arcade from "../assets/icon-arcade.svg";
import advanced from "../assets/icon-advanced.svg";
import pro from "../assets/icon-pro.svg";

export const plans = [
    {
        name: 'Arcade',
        iconSrc: arcade,
        monthPrice: 9,
        yearPrice: 90
    },
    {
        name: 'Advanced',
        iconSrc: advanced,
        monthPrice: 12,
        yearPrice: 120
    },
    {
        name: 'Pro',
        iconSrc: pro,
        monthPrice: 15,
        yearPrice: 150
    },
]

export const addons = [
    {
        name : 'Online service',
        desc: 'Access to multiplayer games',
        monthPrice: 1,
        yearPrice: 10
    },
    {
        name : 'Larger storage',
        desc: 'Extra 1TB of cloud save',
        monthPrice: 2,
        yearPrice: 20
    },
    {
        name : 'Customizable profile',
        desc: 'Custom theme on your profile',
        monthPrice: 2,
        yearPrice: 20
    }
]