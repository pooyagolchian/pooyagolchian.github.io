---
import React, { useState } from 'react';
import styles from './Menu.module.scss';
---

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    console.log(12)

    return (
        <div class={`${styles.menu} ${isOpen ? styles.open : ''}`}>
            <button class={styles.menuToggle} onClick={toggleMenu}>
                Menu
            </button>
            <nav class={styles.menuItems}>
                <ul>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
