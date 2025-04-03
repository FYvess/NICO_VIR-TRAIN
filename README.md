# NICO_VIR-TRAIN
# Company Virtual Training Web Application

## Overview
This is a simple web-based virtual training application for company testers. Users can select a tester type (PM, CAL, GAGE) and navigate to isolation and installation training pages.

## Features
- Multiple-page structure for better organization
- Simple and clean UI with HTML, CSS, and JavaScript
- Navigation for Isolation and Installation pages
- Lightweight and easy to run locally

## File Structure
```
README.md
ANALOG_VIRTRAIN
  | -- assets
     | -- image
     | -- video
  | -- css
  | -- js
  | -- pages
      │── pm.html            # PM Breakdown Checklist page
      │── cal.html           # Calibration Diagnostics page
      │── gage.html          # Gage Breakdown page
      │── isolation.html     # Isolation selection page
      │── installation.html  # Installation selection page
  | -- index.html
```

## How to Run Locally in VS Code

### Prerequisites
- Install [Visual Studio Code](https://code.visualstudio.com/)
- Recommended: Install the **Live Server** extension in VS Code for easier local preview

### Steps to Run
1. **Clone or Download the Project:**
   - If using Git:  
     ```sh
     git clone https://github.com/your-repo/company-training.git
     cd company-training
     ```
   - Or manually download the files and extract them into a folder.

2. **Open the Folder in VS Code:**
   - Open VS Code and go to **File → Open Folder**
   - Select the project folder

3. **Run with Live Server:**
   - Install the **Live Server** extension (if not installed yet)
   - Right-click on `index.html` → Click **Open with Live Server**
   - This will open the website in your default web browser.

4. **Run Manually (Without Live Server):**
   - Open `index.html` manually in your browser by double-clicking it.

## Future Improvements
- Adding Firebase for data management
- Implementing React for a more dynamic UI
- Expanding backend with Node.js if needed

---
For any questions or improvements, feel free to contribute! 🚀

