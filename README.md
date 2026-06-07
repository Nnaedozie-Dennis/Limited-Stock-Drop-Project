# Aether Sneaker Reservation Platform

## Overview

Aether is a full-stack sneaker reservation platform that allows users to reserve limited-edition sneakers before completing checkout.

The platform was developed using React, TypeScript, Express, Supabase, and Tailwind CSS.

---

## Features

### User Features

* User registration and login
* Password reset functionality
* Product catalog
* Product detail page
* Sneaker reservation system
* Reservation countdown timer
* Order management
* User profile management
* Avatar upload using Supabase Storage

### Admin Features

* Dashboard overview
* Product management
* Inventory monitoring
* Reservation tracking
* Order tracking

---

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express
* TypeScript

### Database

* Supabase PostgreSQL

### Storage

* Supabase Storage

---

## Reservation Logic

1. User selects a sneaker.
2. User reserves available stock.
3. Stock is reduced immediately.
4. Reservation receives a 5-minute expiration window.
5. User can proceed to checkout before expiration.
6. Expired reservations automatically release stock back into inventory.

---

## Expiration Logic

Reservation expiration is handled through a scheduled background process.

The process:

* Runs periodically
* Finds expired reservations
* Updates reservation status to EXPIRED
* Restores inventory stock

---

## Concurrency Considerations

### How Race Conditions Were Handled

The application immediately updates product stock after reservation creation.

This reduces the likelihood of overselling inventory.

However, the current implementation does not use database transactions or row-level locking.

Under heavy concurrency, simultaneous reservation requests could still create race-condition scenarios.

Production systems should implement:

* PostgreSQL transactions
* Row-level locking
* Atomic inventory updates

---

## Schema Design Decisions

### Products Table

Stores sneaker inventory and product information.

### Reservations Table

Stores temporary stock reservations before checkout.

### Orders Table

Stores completed purchases.

### Profiles Table

Stores user information separately from authentication records.

---

## Trade-Offs

The project prioritizes simplicity and rapid implementation.

Trade-offs include:

* Polling-based expiration jobs
* Simplified inventory updates
* Limited concurrency protection
* No caching layer

These choices improve development speed but reduce scalability.

---

## What Would Break At 10,000 Concurrent Users

Potential bottlenecks include:

* Single backend server instance
* Database contention
* Reservation race conditions
* Inventory update conflicts
* Lack of caching
* Periodic expiration polling

These issues could result in slower response times and inventory inconsistencies.

---

## Scaling Strategy

To support larger traffic volumes:

* PostgreSQL transactions
* Row-level locking
* Redis caching
* Queue processing (BullMQ)
* Horizontal backend scaling
* Load balancing
* CDN image delivery
* Database read replicas

---

## API Error Handling

The application handles:

* Product not found
* Reservation not found
* Expired reservations
* Insufficient stock
* Authentication failures
* Network errors

---

## Testing

### Reservation Logic

Verified:

* Reservation creation
* Stock reduction
* Checkout flow

### Expiration Logic

Verified:

* Reservation expiration
* Inventory restoration

### Timer Logic

Verified:

* Countdown accuracy
* Expiration detection
* Checkout disabling after expiration

### API Handling

Verified:

* Validation failures
* Missing resources
* Server-side errors

---

## Future Improvements

* Full role-based admin system
* Payment integration
* Real-time inventory updates
* Advanced analytics dashboard
* Email notifications
* Automated testing
