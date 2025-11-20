# 🔥 Doom Fire Algorithm

> *An interactive implementation of the classic fire propagation algorithm from DOOM with enhanced features and real-time controls*

**Live Demo: [https://caio-p-b.github.io/Doom-Fire-Algorithm/](https://caio-p-b.github.io/Doom-Fire-Algorithm/)**

<p align="center">
  <img src="https://github.com/Caio-P-B/Doom-Fire-Algorithm/blob/main/images/img4.png" alt="Doom Fire Algorithm Demo" width="600">
</p>

## Features

| Feature | Description |
|---------|-------------|
| 🎨 **8 Color Palettes** | Classic, Red, Blue, Green, Pink, Candy, Grayscale, Rainbow |
| 🌪️ **Wind Direction Control** | Left, Center, Right - Real-time flame manipulation |
| 🔥 **Dynamic Fire Intensity** | Adjust flame strength and height on the fly |
| 🔍 **Interactive Debug Mode** | Visualize the fire matrix with numerical data |
| ⚡ **Pure JavaScript** | No dependencies - vanilla implementation |

## 🧠 How It Works

### 1. Data Structure
The foundation uses a **one-dimensional array** where each element represents a pixel's fire intensity (0-36). This array efficiently maps to a 2D grid for visual representation while maintaining optimal performance.

![Data Structure](https://github.com/Caio-P-B/Doom-Fire-Algorithm/blob/main/images/img3.png)

### 2. Fire Propagation Algorithm  
The algorithm processes the fire from **bottom to top**, applying decay and wind direction effects. Each pixel's intensity is calculated based on the pixel below it with random decay and directional influence, creating realistic flame movement.

![Fire Propagation Algorithm](https://github.com/Caio-P-B/Doom-Fire-Algorithm/blob/main/images/img2.png)

### 3. Rendering System
The visualization uses **HTML tables** with dynamic color palettes. The system supports both normal viewing and debug mode, which displays numerical values and indices for educational purposes and development.

![Rendering System](https://github.com/Caio-P-B/Doom-Fire-Algorithm/blob/main/images/img1.png)

## 🛠 Technologies

- **HTML5** - Table-based rendering system
- **CSS3** - Styling and responsive design  
- **JavaScript** - Fire algorithm and interactive features
- **No Dependencies** - Pure vanilla implementation

## 🙏 Credits

Inspired by the original **DOOM fire effect** and **Filipe Deschamps**' educational implementation.

**License**: MIT © [Caio-P-B](https://github.com/Caio-P-B)

---

*Experience the classic fire algorithm with modern interactivity!* 🚀