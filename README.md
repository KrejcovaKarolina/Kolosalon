# Kolosalon - Bike Rental Calculator

A lightweight web application designed to calculate bike rental costs. This project serves as a showcase of **Vanilla JavaScript** skills, focusing on form validation, real-time data processing, and DOM manipulation.

## 🛠 Tech Stack

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=yellow)

## 🚀 Key Features

The reservation form is divided into four logical sections:

1. **Rental Configuration:** Select the type of bike, quantity, and duration of the rental.
2. **Add-ons:** Option to include a bike rack in the order.
3. **Budget Evaluation:** Users can input their maximum budget.
   - Price Calculation: Instant comparison between total rental cost and user's budget.
   - Visual feedback: The information message changes color (green for "within budget", red for "over budget").
   - Calculation button remains `disabled` until all required fields are filled.
4. **Order Submission:**
   - Includes email validation.
   - Final submission triggers a confirmation alert and resets the form to its initial state.

## 🧠 JavaScript Logic

This project demonstrates:

- **Event Listeners:** Tracking user input to enable/disable buttons dynamically.
- **DOM Manipulation:** Updating text content and CSS styles (colors) based on calculation results.

## ⚙️ How to Run Locally

Since this is a static website, no installation is required:

1. Clone the repository:
   - `git clone https://github.com/KrejcovaKarolina/Kolosalon.git`
