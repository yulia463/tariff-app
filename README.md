# Tariffs App

This project is a **tariff selection interface** built with **React**, **Next.js**, and **Tailwind CSS**.  
It allows users to select tariffs, see discounts, and interact with a fixed timer in the header.

---

## Features

- **Tariff selection**: highlight selected tariffs on click.
- **Animated Buy button**: blinking effect when clicked (no transition on click).
- **Fixed header timer**:
    - Timer set to **2 minutes**.
- **Validation**: if the Buy button is clicked without selecting the required checkbox, it highlights in red.
- **Dynamic tariff display**: tariffs are fetched from the service and displayed on the page.
- **Price changes after timer ends**: discounted prices disappear and only regular prices remain.
    - Suggestion for animation: **smooth fade-out of discounted price and fade-in of regular price**.

---

## Technologies Used

- **React**
- **Next.js**
- **Tailwind CSS**
- **Jest** + **React Testing Library** for unit and snapshot tests

---

## Getting Started

```bash
npm run dev
```


Clone the repository:

```bash
git clone https://github.com/yulia463/tariff-app
```
## Author: Yulia Slatvitskaya
