🔥 Doom Fire Algorithm
https://img.shields.io/badge/JavaScript-ES6+-yellow
https://img.shields.io/badge/HTML5-Table--Rendering-orange
https://img.shields.io/badge/CSS3-Styling-blue
https://img.shields.io/badge/License-MIT-green

An enhanced implementation of the classic DOOM fire effect with multiple color palettes and interactive controls.

https://screenshots/demo.png

✨ Features
🌈 8 Color Palettes - Classic, Red, Blue, Green, Pink, Candy, Grayscale, Rainbow

🌪️ Wind Direction Control - Left, Center, Right

🔥 Dynamic Fire Intensity - Real-time strength adjustment

🔍 Interactive Debug Mode - Visualize fire matrix with numerical data

📱 Responsive Design - Adapts to different screen sizes

🚀 Quick Start
bash
# Clone the repository
git clone https://github.com/your-username/doom-fire-algorithm.git

# Navigate to project directory
cd doom-fire-algorithm

# Open in browser
open index.html
🧠 How It Works
1. Data Structure
The foundation uses a one-dimensional array where each element represents a pixel's fire intensity (0-36). This array efficiently maps to a 2D grid for visual representation while maintaining optimal performance.

https://screenshots/data-structure.png

2. Fire Propagation Algorithm
The algorithm processes the fire from bottom to top, applying decay and wind direction effects. Each pixel's intensity is calculated based on the pixel below it with random decay and directional influence, creating realistic flame movement.

https://screenshots/algorithm.png

3. Rendering System
The visualization uses HTML tables with dynamic color palettes. The system supports both normal viewing and debug mode, which displays numerical values and indices for educational purposes and development.

https://screenshots/rendering.png

🎮 Controls
Control	Function	Effect
Wind Direction	Left/Center/Right buttons	Controls flame propagation direction
Fire Intensity	Increase/Decrease buttons	Adjusts flame strength and height
Color Palettes	Dropdown selector	Switches between 8 color schemes
Debug Mode	Toggle button	Shows numerical data and indices
🛠 Technologies
HTML5 - Table-based rendering system

CSS3 - Styling and responsive design

JavaScript - Fire algorithm and interactive features

No Dependencies - Pure vanilla implementation

🙏 Credits
Inspired by the original DOOM fire effect and Filipe Deschamps' educational implementation.

License: MIT

