
---

## ✅ `README.md` for **Frontend (React)**

```markdown
# 🚛 ELD Log Planner UI (React Frontend)

This is the frontend React app built for the Spotter AI assessment. It provides a clean interface for truck drivers to:

- Submit trip details (pickup/dropoff/current location)
- View driving schedules based on FMCSA HOS rules
- Visualize trip routes
- Auto-generate Daily Log Sheets for each driving day

---

## 📦 Tech Stack

- React
- Axios
- Leaflet (Map)
- TailwindCSS
- React Router
- Custom Components: `TripForm`, `RouteMap`, `LogSheet`

---

## 🖥️ Features

- HOS-aware trip planner UI
- Fully responsive layout
- Displays route map
- Renders daily log sheet for every driving day
- Shows error if trip exceeds legal limits

---

## 🔧 Setup Instructions

```bash
git clone https://github.com/Dannyurfavdev/eldlogfrontend.git
cd eldlogfrontend
npm install
npm start

---

## Live Frontend URL
👉 https://eldlogfrontend.onrender.com

---

## 📹 Loom Demo
👉 https://www.loom.com/share/35c94a9e6bab4dfd92bc190710e08209

---

## 📝 Example Inputs

{
  "current_location": "Atlanta, GA",
  "pickup_location": "Miami, FL",
  "dropoff_location": "Seattle, WA",
  "hours_used": 68
}

---

✅ Visuals

✅ Form input

✅ Route on map

✅ Daily log sheet

