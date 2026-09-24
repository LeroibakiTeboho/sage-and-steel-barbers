# Sage & Steel Barbers

A modern, responsive barber shop website built for the Talent Forge Junior Full-Stack Developer practical assessment.

Sage & Steel Barbers is a fictional premium barber shop concept designed to provide a polished digital experience for discovering services, exploring the barbershop, and booking an appointment.

## ✂️ Project Overview

The project focuses on creating a professional barber shop website that feels suitable for a real-world client.

The website includes:

* Professional barber shop branding
* Responsive design across desktop, tablet, and mobile
* Service and pricing presentation
* Barber/shop information
* Gallery
* Contact information
* Online booking experience
* Calendar integration
* Promotional first-visit modal
* Terms & Conditions
* Mobile navigation
* Responsive interactions and animations

## 🎯 Assessment Requirements

This project was developed around the requirements provided in the Talent Forge Junior Full-Stack Developer practical assessment.

The assessment requires a complete professional barber shop website with:

* Home page
* Services and pricing
* About section/page
* Contact and working booking experience
* Professional branding and imagery
* Responsive desktop, tablet, and mobile layouts
* Calendar integration
* At least one purposeful popup or modal
* Accessible Terms & Conditions
* Functional navigation, buttons, forms and links
* Public deployment

The complete booking journey is designed around:

**Homepage → Services → Booking → Select Appointment → Complete Booking → Add Appointment to Calendar**

## 🛠️ Tech Stack

* **Next.js**
* **React**
* **JavaScript**
* **Tailwind CSS**
* **Framer Motion**
* **Lenis**
* **React Icons**

## 🎨 Design

The design direction uses a refined, modern barbershop aesthetic with:

* Dark, premium visual styling
* Strong typography hierarchy
* High-quality barber imagery
* Consistent spacing and layout
* Responsive components
* Subtle motion and interaction
* Clear calls to action

The interface was designed with usability and visual consistency in mind rather than relying solely on default component styles.

## 📄 Main Pages

### Home

The homepage introduces Sage & Steel Barbers through a strong hero section, visual content, service highlights and clear calls to action leading toward booking.

### Services

Displays the available barber services and pricing in a structured format.

### About

Introduces the barbershop and its brand/story.

### Gallery

Provides a visual showcase of the barbershop and barber work. Images can be opened for a larger view.

### Booking

Provides the customer booking experience, including appointment selection and customer information.

### Contact

Provides business contact information and relevant ways for customers to get in touch.

### Terms & Conditions

Provides the site's legal terms and booking-related conditions.

## 📅 Booking & Calendar Integration

The booking experience allows customers to select appointment information such as:

* Service
* Barber, where applicable
* Date
* Time
* Customer information

After completing the booking process, the customer can add the appointment to their calendar.

Calendar information is generated from the customer's selected appointment details rather than using one fixed appointment.

The calendar event is designed to carry relevant information such as:

* Barbershop name
* Selected service
* Appointment date
* Start time
* End time
* Location
* Appointment details

## 🎁 Promotional Modal

The website includes a first-visit promotional modal.

The modal provides a promotional code for new customers and includes actions to:

* Copy the promotional code
* Continue to booking
* Dismiss the promotion

The promotion is designed to appear for first-time visitors without repeatedly interrupting returning visitors.

## 📱 Responsive Design

The website is designed for:

* Desktop
* Tablet
* Mobile

Responsive behavior includes:

* Mobile navigation
* Flexible layouts
* Responsive typography
* Responsive imagery
* Mobile-friendly forms
* Accessible buttons and interactions

## ⚡ Performance & User Experience

The project uses lightweight animations and smooth scrolling to enhance the experience while maintaining a clear navigation structure.

Interactive elements are designed to provide visual feedback and meaningful actions rather than functioning as decorative elements only.

## 🧪 Testing

Before deployment, the website should be tested across the complete customer journey:

1. Open the homepage
2. Navigate to Services
3. Open the booking experience
4. Select a service
5. Select a barber where applicable
6. Select a date
7. Select a time
8. Enter customer information
9. Complete the booking
10. Add the appointment to a calendar
11. Test the promotional modal
12. Test mobile navigation
13. Test Terms & Conditions
14. Check links, buttons and images
15. Test the deployed website on desktop and mobile

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js installed
* npm installed

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

### Development Server

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 🌐 Deployment

The production website is publicly deployed so that the assessment can be reviewed without requiring access to the development environment.

**Live Website:**
`<your-live-website-url>`

## 📁 Project Structure

A simplified structure of the project:

```text
src/
├── app/
│   ├── about/
│   ├── booking/
│   ├── contact/
│   ├── gallery/
│   ├── services/
│   └── ...
│
├── components/
│   ├── layout/
│   ├── ui/
│   └── ...
│
└── ...

public/
├── images/
└── ...
```

The exact structure may vary depending on the final implementation.

## 👤 Developer

**Teboho Leroibaki**

Software Developer

## 📜 License

This project was created as a practical assessment project for the Talent Forge Junior Full-Stack Developer opportunity.

Sage & Steel Barbers is a fictional business created for the assessment.
