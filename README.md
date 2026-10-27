# Hostelbird UX Redesign — Hackathon Submission

**Participant:** Shashwat Nigam  
**Project:** Hostelbird FlowFix & Redesign  
**Type:** Frontend UX prototype (HTML · CSS · Vanilla JavaScript)

---

## Overview

This project was submitted as part of a hackathon challenge to identify and fix critical bugs in the [Hostelbird](https://hostelbird.com) web application — a hostel booking platform.

After an extensive review of the live site, three critical bugs were identified and a functional, interactive prototype was built to demonstrate the fixes.

---

## Step 1 & 2: Bugs Identified

### Bug 1: Room Selection & Booking Flow Failure *(Critical)*

**Issue:** On the property details page (e.g., The Social Stays Goa), clicking **"Select"** for any room type (Privates or Dorms) does not update the Booking Summary. The total stays at ₹0 and displays "Select a room to continue." This completely blocks the core conversion funnel — users cannot proceed to checkout.

### Bug 2: Non-Responsive Header Navigation *(High)*

**Issue:** The User Profile icon and Hamburger Menu (top-right) are completely unresponsive to clicks. Users cannot log in, sign up, or access their profile. Mobile and tablet users lose all navigation access.

### Bug 3: Static Search Elements on Homepage *(Medium)*

**Issue:** The "Let's Go!" CTA button and the "Travellers" selection component in the hero section are non-interactive. The primary search flow — the main entry point for booking — is broken.

---

## Step 3: Solutions Built

### Solution 1 — Dynamic Booking State Management
Rebuilt the booking flow with JavaScript state management. Clicking "Select" now updates an internal state array tracking rooms, quantities, and total price in real time. The Booking Summary updates dynamically.

### Solution 2 — Responsive Header Navigation
Implemented proper event listeners. The hamburger menu opens a smooth side-drawer for mobile navigation. The profile icon opens a contextual dropdown with ARIA attributes for accessibility.

### Solution 3 — Functional Search Hero Component
Converted the static hero section into a working form. The "Travellers" element opens a custom dropdown for guest count selection. The "Let's Go!" button validates input before redirecting.

---

## Prototype

A fully functional frontend prototype that implements all three fixes while preserving the Hostelbird visual aesthetic.

**Files:**
- `index.html` — Fixed header navigation and homepage search
- `booking.html` — Fixed room selection and dynamic checkout summary
- `styles.css` — Custom design system (glassmorphism, clean typography)
- `app.js` — State management, UI interactions, cart calculations

**To preview:** Open `index.html` in any modern web browser. No build step or server required.

---

## Accessibility

- ARIA labels on all icon buttons
- Keyboard-accessible navigation drawer
- Sufficient colour contrast in the design system
- Responsive layout for mobile and desktop viewports

---

## Technologies

| Technology | Use |
|-----------|-----|
| HTML5 | Semantic structure |
| CSS3 | Custom properties, Flexbox, transitions, glassmorphism |
| Vanilla JavaScript | State management, DOM events, cart logic |
| Ionicons | UI icons (via CDN) |
| Google Fonts (Inter) | Typography (via CDN) |

> **Note:** This is a frontend-only prototype — it does not connect to the real Hostelbird backend. All booking interactions are simulated in-browser.
